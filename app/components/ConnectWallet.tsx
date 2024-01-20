"use client";
import { useAccount } from 'wagmi';

import Profile from './Profile';
import { WalletOptions } from './WalletOptions';

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Profile />;
  return <WalletOptions />;
}
