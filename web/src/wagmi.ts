import { getDefaultConfig } from "connectkit";
import { http, createConfig } from "wagmi";
import { baseSepolia, localhost } from "wagmi/chains";

const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID || "";
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const config = createConfig(
  getDefaultConfig({
    appName: "NFT Marketplace",
    chains: [baseSepolia, localhost],
    walletConnectProjectId: WC_PROJECT_ID,
    transports: {
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      ),
      [localhost.id]: http("http://127.0.0.1:8545"),
    },
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
