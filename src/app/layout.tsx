import './globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from './WalletProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Web3 App',
  description: 'A Next.js app for Web3 interactions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
