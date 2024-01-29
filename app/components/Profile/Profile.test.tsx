import React from 'react';
import '@testing-library/jest-dom';
import { RenderResult, screen } from '@testing-library/react';

import Profile from './index';
import { renderWithWagmiProviders } from '../../../test-utils/testHelpers';

describe('Profile', () => {
  const testAddress = process.env.TEST_ADDRESS;
  let component: RenderResult;

  beforeEach(() => {
    component = renderWithWagmiProviders(<Profile />);
  });

  it('should render Profile component', () => {
    expect(component).toBeDefined();
  });

  it('should render chainId', () => {
    const chainInfoEl = screen.getByTestId('chainInfo');
    expect(chainInfoEl.textContent).toStrictEqual('Chain: Ethereum');
  });
  
  it('address should be defined', () => {
    expect(testAddress).toBeDefined();
    expect(testAddress).toHaveLength(42);
  });

  it('should render address properly', () => {
    const addressEl = screen.getByTestId('addressInfo');
    expect(addressEl.textContent).toStrictEqual(`Address: ${testAddress}`);
  });
});
