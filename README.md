This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



### How to create a Solana Keypair

1. Install Solana CLI
```bash
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
```
2. Create a new keypair
```bash
solana-keygen grind --starts-with dev:1 

```
3. Set as default solana keypair
```bash
solana config set --keypair key8FLEejBBRFUQE1vgETB3KBRSrJ887eq8SxJSb7Yh.json
```
4. Check if in devnet
```bash
solana config get
```
5. Change to devnet
```
bash
solana config set -ud
// Then set the keypair of the RYORI devnet key: 
solana config set --keypair _defaultryori-solanakeypair.json
```
6. Ask for Airdrop // WIP
```base
solana --url devnet airdrop 1 3KXpfiRF9AgDnG5GKxQ9a4bVr6HKXupzMnc22HKHh9hn
```
