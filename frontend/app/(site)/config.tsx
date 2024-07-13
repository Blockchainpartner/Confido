import { http, createConfig } from 'wagmi'
import { base, mainnet ,sepolia} from 'wagmi/chains'
import {  metaMask } from 'wagmi/connectors'



export const config = createConfig({
    //@ts-ignore
  chains: [sepolia, mainnet, base],
  connectors: [

  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

