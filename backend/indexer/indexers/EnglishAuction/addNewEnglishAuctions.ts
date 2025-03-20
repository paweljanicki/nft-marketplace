import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { IAuction } from "../../types";

export async function addNewEnglishAuctions({
  englishAuctionContract,
  supabase,
  provider,
}: {
  englishAuctionContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  englishAuctionContract.on(
    "AuctionCreated",
    async (
      auctionId,
      owner,
      nftContract,
      tokenId,
      startingBid,
      duration,
      timestamp
    ) => {
      console.log(
        auctionId,
        owner,
        nftContract,
        tokenId,
        startingBid,
        duration,
        timestamp
      );

      const auction: IAuction = {
        auction_id: Number(auctionId),
        collection_address: nftContract,
        token_id: Number(tokenId),
        seller: owner,
        starting_bid: startingBid.toString(),
        status: "NOT_STARTED",
        highest_bidder: ethers.constants.AddressZero,
        highest_bid: startingBid.toString(),
        bids_count: 0,
      };

      const { error } = await supabase.from("auctions").upsert([auction]);

      if (error) {
        console.log("Error upserting auctions", error);
        throw error;
      }
    }
  );
}
