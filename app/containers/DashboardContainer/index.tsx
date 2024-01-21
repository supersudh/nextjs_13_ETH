"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { wagmiConfig } from '../../helpers/wagmi.config';
import { useAppContext } from '../../lib/state-management';

const queryClient = new QueryClient();

const ConnectWalletDynamic = dynamic(() => import('../../components/ConnectWallet'), { ssr: false });
const DashboardDynamic = dynamic(() => import('./components/Dashboard'), { ssr: false });

export default function DashboardContainer() {
  const [appState, appDispatch] = useAppContext();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div id="dashboardContainer">
          <ConnectWalletDynamic />
          <DashboardDynamic />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
