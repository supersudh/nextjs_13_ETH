import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { wagmiConfig } from '../../helpers/wagmi.config';

import Profile from './index';
import { useAccount } from 'wagmi';

const testAddress = '0x1C6a361dda5084F27093212BC3484326C738C458';
const testChainObject: any = { name: 'Ethereum' };
const chainId = 1;

describe('Profile', () => {
  const queryClient = new QueryClient();
  const component = render(
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    </WagmiProvider>
  );

  // it('should render Profile component', () => {
  //   expect(component.)
  // });
  const useAccountMockValues = {
    address: testAddress,
    chain: testChainObject,
    chainId,
  };
  jest.spyOn({ useAccount }, 'useAccount').mockReturnValue(useAccountMockValues as any);
  it('should render chainId', () => {
    const chainInfoEl = component.getByTestId('chainInfo');
    expect(chainInfoEl.textContent).to.equal(`Chain: ${testChainObject.name}`);
  });
});