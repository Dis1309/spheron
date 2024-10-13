"use client";
import Image from "next/image";
import ClientButton from "./components/provider";

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const wallets = [new PetraWallet()];
export default function Home() {
  return (
    <div>
      <h1>Server-Side Content</h1>
      {/* Use Client Component for interactivity */}
      {/* <ClientButton /> */}
      <WalletSelector></WalletSelector>
    </div>
  );
}
