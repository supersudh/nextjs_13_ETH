"use client";
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi'

import './Dashboard.scss';

import { setActiveAddress, setActiveChain, setIsConnectedToBlockchain, setTransactions, useAppContext } from "../../../../lib/state-management";
import DataTable from '../../../../components/DataTable';
import { fetchTransactions } from '../../../../lib/Data';

function DashboardRenderer({ children }) {
  return <div className="Dashboard" data-testid="Dashboard">{children}</div>
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
      <section className="dashboard-not-connected" data-testid="dashboard-not-connected-t">
        <p className="dnc-msg-1">You are not connected to a wallet...</p>
        <p className="dnc-msg-2">Click on a provider above to establish connection.</p>
      </section>
    </DashboardRenderer>
  );
}
