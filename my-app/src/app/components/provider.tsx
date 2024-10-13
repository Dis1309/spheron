"use client";  // Declares this as a Client Component
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
export default function ClientButton() {
    const getProvider = async () => {
        if ("martian" in window) {
            console.log("done");
         //   @ts-ignore
           var res = await window.martian.connect();
           console.log(res);
           return;
        }
        console.log("not done")
        window.open("https://www.martianwallet.xyz/", "_blank");
      };
      return (
        <button onClick={getProvider}>Connect wallet</button>
      );
}