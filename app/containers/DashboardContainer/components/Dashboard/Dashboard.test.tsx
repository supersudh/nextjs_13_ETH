import React from 'react';
import '@testing-library/jest-dom';
import { RenderResult, screen } from '@testing-library/react';

import Dashboard from './index';
import { AppContextProvider } from '../../../../lib/state-management';
import { renderWithWagmiProviders } from '../../../../../test-utils/testHelpers';
import { AppState } from '../../../../lib/state-management/types';
import { transfersMockData } from '../../../../../test-utils/mockData';
import * as Data from '../../../../lib/Data';
import { act } from 'react-dom/test-utils';

describe('Dashboard', () => {
  function renderDashboardPlain() {
    return renderWithWagmiProviders(
      <AppContextProvider>
        <Dashboard />
      </AppContextProvider>,
      false,
    );
  }

  function renderDashboardWithConnection() {
    const customInitialState: AppState = {
      isConnectedToBlockchain: true,
      activeAddress: process.env.TEST_ADDRESS,
      activeChain: 1,
      activeToken: '',
      transactions: [],
    };

    jest.spyOn(Data, 'fetchTransactions').mockImplementation(async () => {
      return transfersMockData;
    });

    return renderWithWagmiProviders(
      <AppContextProvider customInitialState={customInitialState}>
        <Dashboard />
      </AppContextProvider>
    );
  }

  it('should render Dashboard container', () => {
    const component = renderDashboardPlain();
    expect(component).toBeDefined();
  });

  it('should render not connected message', () => {
    renderDashboardPlain();
    const notConnectedSectionEl = screen.getByTestId('dashboard-not-connected-t');
    expect(notConnectedSectionEl.childElementCount).toEqual(2);
    expect(notConnectedSectionEl.childNodes[0].textContent).toStrictEqual('You are not connected to a wallet...');
    expect(notConnectedSectionEl.childNodes[1].textContent).toStrictEqual('Click on a provider above to establish connection.');
  });

  it('should render all Transfers and DataTable', async () => {
    let component: RenderResult;
    await act(async () => {
      component = renderDashboardWithConnection();
    });
    expect(component).toBeDefined();
    const DashboardEl = screen.getByTestId('Dashboard');
    expect(DashboardEl.childElementCount).toEqual(2);
    expect(DashboardEl.childNodes[0].textContent).toStrictEqual('All Transfers:');
    expect(DashboardEl.childNodes[1]).toBeDefined();
  });
});
