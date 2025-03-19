import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";
import { Database } from "./types/supabase";
import { setupNFTFactoryIndexer } from "./indexers/NFTFactory/NFTFactoryIndexer";
import { setupNFTIndexer } from "./indexers/NFT/NFTIndexer";

dotenv.config();

// Configuration from environment variables
const RPC_URL =
  process.env.RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
const NFT_FACTORY_ADDRESS = process.env.NFT_FACTORY_ADDRESS || "";
const AUCTION_HOUSE_ADDRESS = process.env.AUCTION_HOUSE_ADDRESS || "";
const START_BLOCK = parseInt(process.env.START_BLOCK || "0");

// Initialize Supabase client
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

// Initialize Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

async function main() {
  console.log("Starting blockchain indexer...");

  try {
    // Start indexers for each contract type
    if (NFT_FACTORY_ADDRESS) {
      console.log(`Starting NFTFactory indexer for ${NFT_FACTORY_ADDRESS}`);
      await setupNFTFactoryIndexer(
        provider,
        supabase,
        NFT_FACTORY_ADDRESS,
        START_BLOCK
      );

      await setupNFTIndexer(
        provider,
        supabase,
        NFT_FACTORY_ADDRESS,
        START_BLOCK
      );
    }

    // if (AUCTION_HOUSE_ADDRESS) {
    //   console.log(`Starting AuctionHouse indexer for ${AUCTION_HOUSE_ADDRESS}`);
    //   await setupAuctionHouseIndexer(
    //     provider,
    //     supabase,
    //     AUCTION_HOUSE_ADDRESS,
    //     START_BLOCK
    //   );
    // }

    // // The EnglishAuction indexer will be set up dynamically based on events from AuctionHouse
    // console.log(
    //   "Setting up EnglishAuction indexer for dynamically created contracts"
    // );
    // await setupEnglishAuctionIndexer(provider, supabase);

    console.log("All indexers started successfully");
  } catch (error) {
    console.error("Error starting indexers:", error);
    process.exit(1);
  }
}

// Handle termination signals
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down...");
  process.exit(0);
});

main().catch(console.error);
