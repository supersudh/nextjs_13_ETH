"use client";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  // useBalance
} from 'wagmi';

import {
  mainnet,
  linea,
  goerli,
  sepolia,
  lineaTestnet,
  Chain
} from 'wagmi/chains';

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
  return <div>Chain: {chainName}</div>
}

export default function Profile() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {/* {chain?.id && <div>Chain: {chain.name}</div>} */}
      <ChainDetails chain={chain} chainId={chainId} />
      {address && <div>{ensName ? `${ensName} (${address})` : `Address: ${address}`}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}