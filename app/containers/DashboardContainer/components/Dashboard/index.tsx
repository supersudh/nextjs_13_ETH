"use client";
import { useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi'

import { setActiveAddress, setActiveChain, setIsConnectedToBlockchain, setTransactions, useAppContext } from "../../../../lib/state-management";
import DataTable from '../../../../components/DataTable';
import { fetchTransactions } from '../../../../lib/Data';

function DashboardRenderer({ children }) {
  return <div className="Dashboard">{children}</div>
}

export default function Dashboard() {
  const [appState, appDispatch] = useAppContext();
  const account = useAccount();

  const {
    isConnectedToBlockchain,
    activeAddress
  } = appState;

  useEffect(() => {
    if (isConnectedToBlockchain) {
      (async () => {
        const transactions = await fetchTransactions({ currentUserAddress: activeAddress });
        appDispatch(setTransactions(transactions));
      })();
    }
  }, [isConnectedToBlockchain]);

  useEffect(() => {
    appDispatch(setIsConnectedToBlockchain(account.isConnected));
    appDispatch(setActiveAddress(account.address));
    appDispatch(setActiveChain(account.chainId));
  }, [account.isConnected]);

  if (account.isConnected) {
    return (
      <DashboardRenderer>
        <p>All Transfers:</p>
        <DataTable transactions={appState.transactions} />
      </DashboardRenderer>
    );
  }

  return (
    <DashboardRenderer>
      <div>
        <p>You are not connected to a wallet...</p>
        <p>Click on a provider above to establish connection.</p>
      </div>
    </DashboardRenderer>
  );
}
