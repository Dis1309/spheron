"use client"

import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useState } from "react";
 
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);
export default function Buy() {
    const {account,signAndSubmitTransaction} = useWallet();
    const [created, setCreated] = useState(false);
    const buy_nft = async () => {
        console.log(account?.address)
          if (!account) return [];
          console.log(account);
          // change this to be your module account address
          const moduleAddress = "0xed904d3cb8e239b0184a1081a4dfbff8c11dba3802b84e7c38c419a2c217036c";
          console.log("hey")
          try{
          const transaction:InputTransactionData = {
            data: {
              function:`${moduleAddress}::Project::buy_nft`,
              functionArguments:["0xed904d3cb8e239b0184a1081a4dfbff8c11dba3802b84e7c38c419a2c217036c",1,1]
            }
          }
          const response = await signAndSubmitTransaction(transaction);
          // wait for transaction
          await aptos.waitForTransaction({transactionHash:response.hash});
          console.log(response);
          setCreated(true);
        }catch(e) {
            console.log(e);
        }
        };
    return (<button onClick={async() =>{ console.log("hey"); await buy_nft()}}>
       { created ? 'Sold' : '0.001 ETH'}
       </button>)

}