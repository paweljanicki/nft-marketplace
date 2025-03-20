import { IAuction } from "./../../types/index";
import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function updateCreatedEnglishAuctions({
  englishAuctionContract,
  supabase,
  provider,
}: {
  englishAuctionContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  // Get all auctions

  const auctionsCount = await englishAuctionContract.getTotalAuctions();

  console.log("Auctions count", Number(auctionsCount));

  let auctions: Array<IAuction> = [];

  for (let i = 0; i < Number(auctionsCount); i++) {
    const auctionCore = await englishAuctionContract.getAuctionCore(BigInt(i));
    const [nftContract, nftId, seller, startingBid, endAt, started, ended] =
      auctionCore;
    console.log(
      "Auction",
      nftContract,
      nftId,
      seller,
      startingBid,
      endAt,
      started,
      ended
    );

    const status = ended ? "ENDED" : started ? "STARTED" : "NOT_STARTED";

    const auctionBids = await englishAuctionContract.getAuctionBidInfo(
      BigInt(i)
    );
    const [highestBidder, highestBid, bidsCount] = auctionBids;
    console.log("Bids", highestBidder, Number(highestBid), Number(bidsCount));

    auctions.push({
      auction_id: i,
      collection_address: nftContract,
      token_id: Number(nftId),
      seller,
      starting_bid: startingBid.toString(),
      status,
      highest_bidder: highestBidder,
      highest_bid: highestBid ? highestBid.toString() : null,
      bids_count: Number(bidsCount),
      end_at: new Date(Number(endAt) * 1000).toISOString(),
    });
  }

  const { error } = await supabase.from("auctions").upsert(auctions);

  if (error) {
    console.log("Error upserting auctions", error);
    throw error;
  }
}
