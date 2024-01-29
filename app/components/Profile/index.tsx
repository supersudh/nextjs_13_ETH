"use client";
import React from 'react';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import {
  mainnet,
  linea,
  goerli,
  sepolia,
  lineaTestnet,
  Chain
} from 'wagmi/chains';

import Button from '@mui/material/Button';

function ChainDetails({
  chain,
  chainId
}: {
  chain: Chain;
  chainId: undefined | number;
}): JSX.Element {
  let chainName = 'Not Available';
  if (chain?.name) {
    chainName = chain.name;
  } else if (chainId) {
    switch (chainId) {
      case mainnet.id:
        chainName = 'Ethereum Mainnet';
        break;
      case linea.id:
        chainName = 'Linea';
        break;
      case goerli.id:
        chainName = 'Goerli Testnet';
        break;
      case sepolia.id:
        chainName = 'Sepolia Testnet';
        break;
      case lineaTestnet.id:
        chainName = 'Linea Testnet';
        break;
      default:
        break;
    }
  }
  return <div data-testid="chainInfo">Chain: <b>{chainName}</b></div>
}

export default function Profile() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      <ChainDetails chain={chain} chainId={chainId} />
      <div
        data-testid="addressInfo"
        data-cy="addressInfo"
      >
        Address: <b>{address}</b>
      </div>
      <Button
        variant="outlined"
        color="error"
        onClick={() => disconnect()}
        style={{ margin: '0.75rem 0' }}
      >
        Disconnect
      </Button>
    </div>
  );
}
