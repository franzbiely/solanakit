"use client"
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function WalletConnection() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        const connection = new Connection('https://api.devnet.solana.com');
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1000000000); // Convert lamports to SOL
      }
    };

    if (connected) {
      getBalance();
    } else {
      setBalance(null);
    }
  }, [publicKey, connected]);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
      <WalletMultiButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      {connected && (
        <div className="mt-4">
          <p>Connected: {publicKey?.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
        </div>
      )}
    </div>
  );
}