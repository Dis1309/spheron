import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Disconnect() {
    const { disconnect} = useWallet();
    const handleDisconnect = async () => {
        try {
          await disconnect();
          console.log('Disconnected from wallet');
        } catch (error) {
          console.error('Failed to disconnect from wallet:', error);
        }
      };
    
    return (
      <button onClick={() => handleDisconnect()}>
        Disconnect
      </button>
    )
}