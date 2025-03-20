import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getExistingBids({
  englishAuctionContract,
  supabase,
  provider,
}: {
  englishAuctionContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  const fromBlock = 0;
  const toBlock = "latest";

  const events = await englishAuctionContract.queryFilter(
    "BidPlaced",
    fromBlock,
    toBlock
  );

  const bids = events
    .filter((event) => !!event.args)
    .map((event) => {
      if (!event.args) {
        return null;
      }
      const { bidder, amount, auctionId, timestamp } = event.args;
      return {
        bidder,
        amount: amount.toString(),
        auction_id: Number(auctionId),
        timestamp: new Date(timestamp.toNumber() * 1000).toISOString(),
      };
    });

  const { error } = await supabase.from("bids").upsert(bids);

  if (error) {
    console.error("Error saving bids", error);
  }
}
