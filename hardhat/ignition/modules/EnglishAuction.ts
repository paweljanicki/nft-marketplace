import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EnglishAuctionModule = buildModule("EnglishAuctionModule", (m) => {
  const englishAuction = m.contract("EnglishAuction");

  return { englishAuction };
});

export default EnglishAuctionModule;
