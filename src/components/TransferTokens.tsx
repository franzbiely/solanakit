"use client"
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import * as token from "@solana/spl-token";

export default function TransferTokens() {
  const { publicKey, signTransaction } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const transferToken = async () => {
    if (!publicKey || !signTransaction) {
      setMessage('Please connect your wallet first.');
      return;
    }

    if (!recipient) {
      setMessage('Please enter a recipient address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      const privateKeyString = process.env.NEXT_PUBLIC_SOLANA_PRIVATE_KEY;
      if (!privateKeyString) {
        throw new Error('Private key not found in environment variables');
      }
      const keypairData = Uint8Array.from(JSON.parse(privateKeyString));
      const keypair = Keypair.fromSecretKey(keypairData);

      const tokenMintAddress = new PublicKey('ryo1ayppSKencqhbdYZCZ7ubEnk8C5xgQ8dMTbQhmf6');

      const senderTokenAccount = await token.getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        tokenMintAddress,
        publicKey
      );

      const recipientTokenAccount = await token.getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        tokenMintAddress,
        new PublicKey(recipient)
      );

      const transaction = new Transaction().add(
        token.createTransferInstruction(
          senderTokenAccount.address,
          recipientTokenAccount.address,
          publicKey,
          1000000000, // 1 token with 9 decimals
          [],
          token.TOKEN_PROGRAM_ID
        )
      );

      const blockHash = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockHash.blockhash;
      transaction.feePayer = publicKey;

      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature);

      setMessage(`Successfully transferred 1 RYORI token to ${recipient}. Transaction: ${signature}`);
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Failed to transfer RYORI token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transfer RYORI Tokens</h2>
      <input
        type="text"
        placeholder="Recipient's wallet address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button 
        onClick={transferToken} 
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        type="button"
      >
        {isLoading ? 'Transferring...' : 'Transfer 1 RYORI Token'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}