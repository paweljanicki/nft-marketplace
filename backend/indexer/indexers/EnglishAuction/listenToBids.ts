import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { IAuction } from "../../types";

export async function listenToBids({
  englishAuctionContract,
  supabase,
  provider,
}: {
  englishAuctionContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  englishAuctionContract.on(
    "BidPlaced",
    async (
      auctionId,
      bidder,
      amount,
      timestamp,
      previousBidder,
      previousBid
    ) => {
      console.log(
        auctionId,
        bidder,
        amount,
        timestamp,
        previousBidder,
        previousBid
      );

      const { data, error: fetchError } = await supabase
        .from("auctions")
        .select()
        .eq("auction_id", auctionId)
        .limit(1)
        .single();

      if (fetchError) {
        console.error("Error fetching auction", fetchError);
        return;
      }

      const auctionUpdate: Partial<IAuction> = {
        ...data,
        highest_bid: amount.toString(),
        highest_bidder: bidder,
        bids_count: data.bids_count + 1,
      };

      const { error } = await supabase.from("auctions").upsert([auctionUpdate]);

      if (error) {
        console.log("Error upserting auctions (new bid)", error);
        throw error;
      }
    }
  );
}
