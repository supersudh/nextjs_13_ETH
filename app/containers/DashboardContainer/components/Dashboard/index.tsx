"use client";
import { useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi'

import { setActiveAddress, setActiveChain, setIsConnectedToBlockchain, useAppContext } from "../../../../lib/state-management";
import DataTable from '../../../../components/DataTable';

function DashboardRenderer({ children }) {
  return <div className="Dashboard">{children}</div>
}

export default function Dashboard() {
  const [appState, appDispatch] = useAppContext();
  const account = useAccount();

  useEffect(() => {
    appDispatch(setIsConnectedToBlockchain(account.isConnected));
    appDispatch(setActiveAddress(account.address));
    appDispatch(setActiveChain(account.chainId));
  }, [account.isConnected]);

  if (account.isConnected) {
    return (
      <DashboardRenderer>
        <DataTable />
      </DashboardRenderer>
    );
  }

  return <DashboardRenderer><div><p>You are not connected to a wallet...</p></div></DashboardRenderer>
}
