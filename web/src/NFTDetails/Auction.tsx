import { useEffect, useState } from "react";
import { IAuction, INFT } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { CreateAuction } from "./CreateAuction";
import { StartAuction } from "./StartAuction";
import { AuctionDetails } from "./AuctionDetails";

export const Auction = ({ nft }: { nft: INFT }): React.ReactElement => {
  const [auction, setAuction] = useState<IAuction | null>(null);

  useEffect(() => {
    async function fetchAuction() {
      const { error, data } = await supabase
        .from("auctions")
        .select()
        .eq("collection_address", nft.collection_address)
        .eq("token_id", nft.token_id);

      if (error || data.length === 0) {
        console.error("Error fetching NFT:", error);
      } else {
        setAuction(data[0]);
      }
    }
    fetchAuction();
  }, []);

  supabase
    .channel("auctions")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "auctions" },
      (payload) => {
        console.log("Change received!", payload);
        if (!payload.new) {
          return;
        }

        console.log("Updated auction", payload.new);

        const updateAuction = payload.new as IAuction;

        if (auction?.auction_id === payload.new.auction_id) {
          setAuction(updateAuction);
        }
      }
    )
    .subscribe();

  if (!auction) {
    return <CreateAuction nft={nft} />;
  }

  if (auction.status === "NOT_STARTED") {
    return <StartAuction nft={nft} />;
  }

  console.log("Auction", auction);

  return <AuctionDetails auction={auction} />;
};
