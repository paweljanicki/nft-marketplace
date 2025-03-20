import { getDefaultConfig } from "connectkit";
import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID || "";
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const config = createConfig(
  getDefaultConfig({
    appName: "NFT Marketplace",
    chains: [baseSepolia],
    walletConnectProjectId: WC_PROJECT_ID,
    transports: {
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      ),
    },
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
