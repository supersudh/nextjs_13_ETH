import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, goerli, linea, lineaTestnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    // mainnet
    [mainnet.id]: http(),
    // testnetwork
    [linea.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
    [lineaTestnet.id]: http(),
  },
  connectors: [
    injected(),
  ]
});
