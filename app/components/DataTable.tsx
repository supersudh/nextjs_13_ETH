"use client";
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
interface DataTableProps {
  transactions: any[];
}

export default function DataTable(
  { transactions = [] }: DataTableProps
): JSX.Element {
  if (transactions.length === 0) {
    return <p>Loading Transactions</p>;
  }

  const dataGridObject: DataGridProps = {
    columns: [
      { field: 'asset', headerName: 'Asset', flex: 1 },
      { field: 'amount', headerName: 'Amount', flex: 1 },
      { field: 'txHash', headerName: 'Transaction Hash', flex: 1 },
      { field: 'txType', headerName: 'Type', flex: 1 }, // Regular ETH transaction or ERC20 transaction
      { field: 'timestamp', headerName: 'Date', flex: 1 },
      { field: 'from', headerName: 'From', flex: 1 },
      { field: 'to', headerName: 'To', flex: 1 },
    ],
    rows: transactions.map((t, i) => {
      let txHash = t.transaction?.hash;
      if (txHash && txHash.length) {
        txHash = `${txHash.slice(0, 9)}...${txHash.slice(-9)}`;
      } else {
        txHash = 'N/A';
      }
      const txType = t.currency?.tokenType || 'Transfer';
      let from = t.address?.address;
      if (from && from.length) {
        from = `${from.slice(0, 8)}...${from.slice(-8)}`;
      } else {
        from = 'N/A';
      }
      let to = t.wallet?.address;
      if (to && to.length) {
        to = `${to.slice(0, 8)}...${to.slice(-8)}`;
      } else {
        to = 'N/A';
      }
      let amount = t.amount;
      if (amount) {
        amount = `${String(amount).slice(0, 8)}${t.currency?.symbol ? ` ${t.currency.symbol}` : ''}`;
      } else {
        amount = 'N/A';
      }
      return {
        id: txHash === 'N/A' ? i : txHash,
        asset: t.currency?.symbol || 'N/A',
        amount,
        txHash,
        txType,
        timestamp: t.block?.timestamp?.time || 'N/A',
        from,
        to,
      };
    }),
    initialState: {
      pagination: { paginationModel: { pageSize: 25 } },
    },
    pageSizeOptions: [5, 10, 25],
    autoHeight: true,
    autoPageSize: true,
  };

  return (
    <div className="DataTableMainContainer">
      <DataGrid
        {...dataGridObject}
      />
    </div>
  );
}
