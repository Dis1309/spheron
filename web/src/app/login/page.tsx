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
  "0x8c7b4253190a0d6a5f2ef1536d2bd09912c4bbf2d830a8e96cebad12efdaec66";

const Login = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const router = useRouter();
  async function initializeProjectMapping() {
    try {
      const transaction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::initialize_project_mapping`,
          functionArguments: [],
        },
      };
      // Replace `client` with your Aptos client instance and `account` with the signer object
      const response = await signAndSubmitTransaction(transaction);

      // // Optionally, wait for the transaction to be confirmed
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(response);
    } catch (error) {
      console.error("Failed to initialize ProjectMapping:", error);
    }
  }

  async function createUser() {
    if (!account) return [];
    try {
      const transaction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_user`,
          functionArguments: [],
        },
      };
      console.log(transaction);
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(response);

      const projectMappingResource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::ProjectModule::ProjectMapping`,
      });
      // Extract the users mapping from the ProjectMapping resource
      const users = projectMappingResource.data.users;

      // Check if the user's address is present in the users mapping
      if (users[account?.address]) {
        console.log(`User found:`, users[account?.address]);
        return users[account?.address];
      } else {
        console.log("User not found.");
        return null;
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (connected == true) {
      const address = account?.address || "";
      console.log(address);
      initializeProjectMapping();
      createUser();
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
