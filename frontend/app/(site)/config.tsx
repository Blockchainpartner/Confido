import { http, createConfig } from 'wagmi'
import { base, mainnet ,sepolia} from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'



export const config = createConfig({
    //@ts-ignore
  chains: [sepolia, mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId:'8eae5bb7ab2e669a9233bf1178f870f5' }),


  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

