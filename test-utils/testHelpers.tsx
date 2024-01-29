import React from 'react';
import * as wagmi from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '../app/helpers/wagmi.config';
import { render } from '@testing-library/react';


export function renderWithWagmiProviders(children: JSX.Element, shouldHaveFakeConnection = true) {
  const queryClient = new QueryClient();
  const testAddress = process.env.TEST_ADDRESS;
  const testChainObject: any = { name: 'Ethereum' };
  const chainId = 1;
  const useAccountMockValues = {
    address: testAddress,
    chain: testChainObject,
    chainId,
    isConnected: shouldHaveFakeConnection,
  };
  jest.spyOn(wagmi, 'useAccount').mockReturnValue(useAccountMockValues as any);
  return render(
    <wagmi.WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </wagmi.WagmiProvider>
  );
}
