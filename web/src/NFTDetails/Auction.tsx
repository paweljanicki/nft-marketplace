import { useEffect, useState } from "react";
import { IAuction, INFT } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { CreateAuction } from "./CreateAuction";
import { StartAuction } from "./StartAuction";
import { AuctionDetails } from "./AuctionDetails";
import { useAccount } from "wagmi";
import { Text } from "@mantine/core";

export const Auction = ({ nft }: { nft: INFT }): React.ReactElement => {
  const account = useAccount();
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

        const updateAuction = payload.new as IAuction;
        if (auction?.auction_id === payload.new.auction_id) {
          setAuction(updateAuction);
        }
      }
    )
    .subscribe();

  supabase
    .channel("auctions")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "auctions" },
      (payload) => {
        console.log("Change received!", payload);
        if (!payload.new) {
          return;
        }

        const createdAuction = payload.new as IAuction;
        if (
          createdAuction.collection_address === nft.collection_address &&
          createdAuction.token_id === nft.token_id
        ) {
          setAuction(createdAuction);
        }
      }
    )
    .subscribe();

  if (!account.address) {
    return <p>Please connect your wallet to view auction details</p>;
  }

  if (!auction && nft.owner === account.address) {
    return <CreateAuction nft={nft} />;
  }

  if (!auction) {
    return (
      <Text>
        Auction not started yet. Only the owner can start auction. If you own
        this NFT connect appropriate wallet
      </Text>
    );
  }

  if (auction.status === "NOT_STARTED" && account?.address !== auction.seller) {
    return (
      <Text>
        Auction not started yet. Only the owner can start auction. If you own
        this NFT connect appropriate wallet
      </Text>
    );
  }

  if (auction.status === "NOT_STARTED" && account?.address === auction.seller) {
    return <StartAuction nft={nft} />;
  }

  return <AuctionDetails auction={auction} accountAddress={account.address} />;
};
