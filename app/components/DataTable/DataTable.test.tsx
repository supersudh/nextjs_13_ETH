import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DataTable from './index';
import { transfersMockData } from '../../../test-utils/mockData';

describe('DataTable', () => {
  function renderDataTable() {
    return render(
      <DataTable transactions={transfersMockData} />
    );
  }

  function renderDataTableWithEmptyTransactions() {
    return render(
      <DataTable transactions={[]} />
    );
  }

  it('should render DataTable component', () => {
    const component = renderDataTable();
    expect(component).toBeDefined();
  });

  it('should show loading message or spinner when there are no transactions', () => {
    renderDataTableWithEmptyTransactions();
    const loadingPEl = screen.getByTestId('loadingMessage');
    expect(loadingPEl.textContent).toStrictEqual('Loading Transactions...')
  });
});
