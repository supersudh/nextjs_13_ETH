"use client";
import { useEffect, useState } from 'react';
import { Connector, useConnect } from 'wagmi';
import Button from '@mui/material/Button';

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector])

  return (
    <Button
      id={`connect-btn-${connector.name}`}
      disabled={!ready}
      onClick={onClick}
      variant="contained"
      color="primary"
      style={{ margin: '0.25rem' }}
    >
      {connector.name}
    </Button>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}
