import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { IAuction } from "../../types";

export async function updateStartedEnglishAuctions({
  englishAuctionContract,
  supabase,
  provider,
}: {
  englishAuctionContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  englishAuctionContract.on(
    "AuctionStarted",
    async (auctionId, startTime, endTime) => {
      console.log("AuctionStarted", auctionId, startTime, endTime);

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

      const auction: IAuction = {
        ...data,
        status: "STARTED",
        end_at: new Date(Number(endTime) * 1000).toISOString(),
      };

      const { error } = await supabase.from("auctions").upsert([auction]);

      if (error) {
        console.log("Error upserting auctions", error);
        throw error;
      }
    }
  );
}
