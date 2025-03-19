import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTModule = buildModule("NFTModule", (m) => {
  const name = m.getParameter("name", "MyNFTCollection");
  const symbol = m.getParameter("symbol", "MNFT");
  const initialOwner = m.getParameter(
    "initialOwner",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );

  const nft = m.contract("NFT", [name, symbol, initialOwner]);

  return { nft };
});

export default NFTModule;
