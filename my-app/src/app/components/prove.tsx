"use client";  // Declares this as a Client Component
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import App from "next/app";

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const wallets = [new PetraWallet()];
      return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
       {children}
</AptosWalletAdapterProvider>
      );
}