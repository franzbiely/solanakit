import WalletConnection from '../components/WalletConnection';
import TransferTokens from '../components/TransferTokens';
import ClaimRewards from '../components/ClaimRewards';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">My Web3 App</h1>
      <WalletConnection />
      <TransferTokens />
      <ClaimRewards />
    </main>
  );
}
