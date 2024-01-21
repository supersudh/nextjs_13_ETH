"use client";
import { useState } from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

import './DataTable.scss';

interface DataTableProps {
  transactions: any[];
}

function renderNotAvailableValue(txtStr = '') {
  if (!txtStr) {
    return true;
  }
  return false;
}

export default function DataTable(
  { transactions = [] }: DataTableProps
): JSX.Element {
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  if (transactions.length === 0) {
    return <p>Loading Transactions</p>;
  }

  const dataGridObject: DataGridProps = {
    columns: [
      { field: 'asset', headerName: 'Asset', flex: 1 },
      { field: 'amount', headerName: 'Amount', flex: 1 },
      {
        field: 'txHash',
        headerName: 'Transaction Hash',
        flex: 1,
        renderCell: (params) => {
          const txHash = params.value;
          if (renderNotAvailableValue(txHash)) {
            return 'N/A';
          }
          return (
            <Link
              component="button"
              variant="body1"
              onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
            >
              {txHash.slice(0, 9)}...${txHash.slice(-9)}
            </Link>
          );
        }
      },
      { field: 'txType', headerName: 'Type', flex: 1 }, // Regular ETH transaction or ERC20 transaction
      { field: 'timestamp', headerName: 'Date', flex: 1 },
      {
        field: 'from',
        headerName: 'From',
        flex: 1,
        renderCell: (params) => {
          const from = params.value;
          if (renderNotAvailableValue(from)) {
            return 'N/A';
          }
          return (
            <Link
              component="button"
              variant="body1"
              onClick={() => window.open(`https://etherscan.io/address/${from}`, '_blank')}
            >
              {from.slice(0, 8)}...${from.slice(-8)}
            </Link>
          );
        }
      },
      {
        field: 'to',
        headerName: 'To',
        flex: 1,
        renderCell: (params) => {
          const to = params.value;
          if (renderNotAvailableValue(to)) {
            return 'N/A';
          }
          return (
            <Link
              component="button"
              variant="body1"
              onClick={() => window.open(`https://etherscan.io/address/${to}`, '_blank')}
            >
              {to.slice(0, 8)}...${to.slice(-8)}
            </Link>
          );
        }
      },
    ],
    rows: transactions.map((t, i) => {
      const txHash = t.transaction?.hash;
      const txType = t.currency?.tokenType || 'Transfer';
      const from = t.address?.address;
      const to = t.wallet?.address;
      let amount = t.amount;
      if (amount) {
        amount = `${String(amount).slice(0, 8)}${t.currency?.symbol ? ` ${t.currency.symbol}` : ''}`;
      } else {
        amount = 'N/A';
      }
      return {
        id: `tx-${i}`,
        asset: t.currency?.symbol || 'N/A',
        amount,
        txHash,
        txType,
        timestamp: t.block?.timestamp?.time || 'N/A',
        from,
        to,
      };
    }),
    paginationModel: { pageSize, page: activePage },
    pageSizeOptions: [5, 10, 25],
    rowSelection: false,
    disableRowSelectionOnClick: true,
    disableVirtualization: true,
    getRowClassName: () => 'DataTable-Row',
    getCellClassName: () => 'DataTable-Cell'
  };

  return (
    <div className="DataTableMainContainer">
      <DataGrid
        {...dataGridObject}
        onPaginationModelChange={(model) => {
          if (model.page !== activePage)
            setActivePage(model.page);
          if (model.pageSize && model.pageSize !== pageSize)
            setPageSize(model.pageSize);
        }}
      />
    </div>
  );
}
