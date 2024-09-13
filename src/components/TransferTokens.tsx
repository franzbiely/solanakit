export default function TransferTokens() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transfer Tokens</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Transfer
        </button>
      </form>
    </div>
  );
}