import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/contracts.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
    }),
    react(),
  ],
});
