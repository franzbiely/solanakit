"use client"
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import * as token from "@solana/spl-token";

export default function ClaimRewards() {
  const { publicKey, signTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const claimRewards = async () => {
    if (!publicKey || !signTransaction) {
      setMessage('Please connect your wallet first.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const balance = await connection.getBalance(publicKey);

      console.log("balance", balance);

      // Load the keypair (ensure this is done securely)
      const privateKeyString = process.env.NEXT_PUBLIC_SOLANA_PRIVATE_KEY;
      const privateKeyString2 = process.env.NEXT_PUBLIC_SOLANA_PRIVATE_KEY_B;
      if (!privateKeyString || !privateKeyString2) {
        throw new Error('Private key not found in environment variables');
      }

      let privateKey: Uint8Array;
      let privateKey2: Uint8Array;
      try {
        privateKey = Uint8Array.from(JSON.parse(privateKeyString));
        privateKey2 = Uint8Array.from(JSON.parse(privateKeyString2));
      } catch (e) {
        console.error('Error parsing private key:', e);
        throw new Error('Invalid private key format');
      }

      if (privateKey.length !== 64) {
        throw new Error('Invalid private key length');
      }

      const mintAuthority = Keypair.fromSecretKey(privateKey);

      const mintAuthority2 = Keypair.fromSecretKey(privateKey2);

      console.log(46, {mintAuthority})

      // Create a new token
      // const mintKeypair = Keypair.generate();
      // console.log("Generated new KeyPair. Wallet PublicKey: " + mintKeypair.publicKey.toString());

      // // Airdrop some SOL to the mint authority if needed
      // const airdropSignature = await connection.requestAirdrop(mintAuthority.publicKey, 1000000000); // 1 SOL
      // await connection.confirmTransaction(airdropSignature);

      const tokenMint = await token.createMint(
        connection,
        mintAuthority,
        mintAuthority.publicKey,
        null,
        9 // 9 decimals
      );

      console.log(59, {tokenMint:JSON.stringify({tokenMint})})

      // Get the token account of the wallet address, and if it does not exist, create it
      const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
        connection,
        mintAuthority2,
        tokenMint,
        publicKey
      );

      console.log(75, tokenAccount.address)
      // Mint 1 token to the wallet
      const mintTx = await token.mintTo(
        connection,
        mintAuthority,
        tokenMint,
        tokenAccount.address,
        mintAuthority.publicKey,
        1000000000, // 1 token with 9 decimals
      );

      setMessage(`Successfully claimed 1 RYORI token! Mint address: ${tokenMint.toBase58()}, Transaction: ${mintTx}`);
    } catch (error: unknown) {
      console.error('Error:', error);
      if (error instanceof Error) {
        if ('logs' in error) {
          console.error('Transaction logs:', (error as any).logs);
        }
        setMessage(`Failed to claim RYORI token: ${error.message}`);
      } else {
        setMessage('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Claim Rewards</h2>
      <button 
        onClick={claimRewards} 
        disabled={isLoading}
        className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
        type="button"
      >
        {isLoading ? 'Claiming...' : 'Claim Rewards'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}