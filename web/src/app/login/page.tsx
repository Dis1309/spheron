"use client";
import { WalletSelector } from "@/components/WalletSelector";
import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });

export const aptos = new Aptos(aptosConfig);
// change this to be your module account address
export const moduleAddress =
  "0x8da8714ba335ab70f186aef2f81ca95c2531871dfdd432939896a057f57c9222";

const Login = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const router = useRouter();
  const level_wise_contributors = [0, 0, 0]; // low, high , critical

  // CREATE USER
  async function createUser() {
    if (!account) return [];
    try {
      const result = await aptos.view({
        payload: {
          function: `${moduleAddress}::ProjectModule::project_mapping_exist`,
          functionArguments: [account?.address],
         }
      })
      console.log(result);
      
      var flag = result != null ? result[0] : true;
      console.log(flag);
      if(!flag){
      const transaction1: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::initialize_project_mapping`,
          functionArguments: [],
        },
      };
      // Replace `client` with your Aptos client instance and `account` with the signer object
      const response1 = await signAndSubmitTransaction(transaction1);

      // Optionally, wait for the transaction to be confirmed
      console.log("Initializing project mapping...");
      await aptos.waitForTransaction({ transactionHash: response1.hash });
      console.log("ProjectMap initialized!");
      console.log(response1);

      const transaction2: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_user`,
          functionArguments: [],
        },
      };
      console.log("Creating new user and their collection");
      console.log(transaction2);
      const response2 = await signAndSubmitTransaction(transaction2);
      await aptos.waitForTransaction({ transactionHash: response2.hash });
      console.log("Created new user and their collection");
      console.log(response2);
    }
    } catch (error: any) {
      console.log(error);
    }
  }

  // CREATE PROJECT
  async function createProject() {
    if (!account) return [];
    try {
      const startDate = BigInt(new Date("2024-10-10").getTime());
      const endDate = BigInt(new Date("2024-10-20").getTime());
      let newproject = {
        id: 1,
        description: "hello",
        max_bounty: 100,
        start_date: startDate,
        end_date: endDate,
        critical_bounty: 50,
        high_bounty: 30,
        low_bounty: 20,
      };

      const transaction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_project`,
          functionArguments: [
            newproject.id,
            newproject.description,
            newproject.max_bounty,
            newproject.start_date,
            newproject.end_date,
            newproject.critical_bounty,
            newproject.high_bounty,
            newproject.low_bounty,
          ],
        },
      };
      console.log("adding new project...");
      console.log(transaction);
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log("added new project");
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }


  // CREATE CONTRIBUTION under the project
  async function onApproval() {
    if (!account) return [];
    let newcontribution = {
      id: 1,
      level: "critical",
    };
    try {
      const transaction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_contribution`,
          functionArguments: [newcontribution.id, newcontribution.level],
        },
      };
      console.log("adding as contributor");
      console.log(transaction);
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log("added as contributor");
      console.log(response);

      // updating level wise contributors no.
      if (newcontribution.level == "low") {
        level_wise_contributors[0]++;
      } else if (newcontribution.level == "high") {
        level_wise_contributors[1]++;
      } else {
        level_wise_contributors[2]++;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  // SENDING Transactions
  // async function finalTransactions() {
  //   if (!account) return [];
  //   try {
  //     let data = {
  //       deployer: deployer,
  //       projectid: 1,
  //       high: 1,
  //       critical: 1,
  //       low: 1,
  //     };
  //     const transaction: InputTransactionData = {
  //       data: {
  //         function: `${moduleAddress}::ProjectModule::transaction_winners`,
  //         functionArguments: [
  //           data.deployer,
  //           data.projectid,
  //           data.high,
  //           data.critical,
  //           data.low,
  //         ],
  //       },
  //     };
  //     console.log("sending transactions");
  //     console.log(transaction);
  //     const response = await signAndSubmitTransaction(transaction);
  //     await aptos.waitForTransaction({ transactionHash: response.hash });
  //     console.log("all transactions sent");
  //     console.log(response);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    if (connected == true) {
      const address = account?.address || "";
      console.log(address);
      createUser();
      // createProject();
      // onApproval();
      // getallprojectinfo();
      sessionStorage.setItem("accountAddress", address);
      router.push("/dashboard");
    }
  }, [connected]);
  return (
    <div className="relative flex items-center gap-10 justify-center w-full min-h-screen flex-col px-4 bg-black">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-7xl font-bold max-w-screen-lg leading-[1.15] font-secondary">
        Let's Get Started
      </h2>
      <div className="flex flex-row justify-center items-center gap-4">
        <WalletSelector></WalletSelector>
        <button className="bg-white flex items-center gap-x-1.5 group text-black px-4 py-2 rounded-full relative">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
