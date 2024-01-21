"use client";
import { useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi'

import { setActiveAddress, setActiveChain, setIsConnectedToBlockchain, setTransactions, useAppContext } from "../../../../lib/state-management";
import DataTable from '../../../../components/DataTable';

import queryObj from '../../../../lib/Query';

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
        const transactions = await queryObj.fetchTransactions({ currentUserAddress: activeAddress });
        appDispatch(setTransactions(transactions));
      })();
    }
  }, [isConnectedToBlockchain]);

  console.log('Dashboard component', appState.transactions);
  
  useEffect(() => {
    appDispatch(setIsConnectedToBlockchain(account.isConnected));
    appDispatch(setActiveAddress(account.address));
    appDispatch(setActiveChain(account.chainId));
  }, [account.isConnected]);

  if (account.isConnected) {
    return (
      <DashboardRenderer>
        <DataTable transactions={appState.transactions} />
      </DashboardRenderer>
    );
  }

  return <DashboardRenderer><div><p>You are not connected to a wallet...</p></div></DashboardRenderer>
}
