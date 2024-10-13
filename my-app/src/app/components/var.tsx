import { Account } from "@aptos-labs/ts-sdk";
import {
    InputTransactionData,
  } from "@aptos-labs/wallet-adapter-react"

const add = "8c7b4253190a0d6a5f2ef1536d2bd09912c4bbf2d830a8e96cebad12efdaec66"
const alice = Account.generate();
const transaction:InputTransactionData = {
    data: {
      function:`${add}::todolist::create_list`,
      functionArguments:[alice.accountAddress]
    }
  }

export default function Transact() {

    const check = async() => {
        const response = await signAndSubmitTransaction(transaction);
    }
    return (
        
    )
}