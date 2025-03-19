import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTFactoryModule = buildModule("NFTFactoryModule", (m) => {
  const nftFactory = m.contract("NFTFactory");

  return { nftFactory };
});

export default NFTFactoryModule;
