import { useEffect, useRef, useState } from "react";
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
  const auctionsChannelsRef = useRef<any>(null);
  const currentAuctionRef = useRef<IAuction | null>(null);

  useEffect(() => {
    currentAuctionRef.current = auction;
  }, [auction]);

  useEffect(() => {
    async function fetchAuction() {
      const { error, data } = await supabase
        .from("auctions")
        .select()
        .eq("collection_address", nft.collection_address)
        .eq("token_id", nft.token_id);

      if (error) {
        console.error("Error fetching NFT:", error);
      } else if (data.length === 0) {
        console.log("No auction found");
      } else {
        setAuction(data[0]);
      }
    }
    fetchAuction();

    const auctionsChannel = supabase
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
          const currentAuction = currentAuctionRef.current;
          if (currentAuction?.auction_id === payload.new.auction_id) {
            setAuction(updateAuction);
          }
        }
      )
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

    auctionsChannelsRef.current = auctionsChannel;

    return () => {
      console.log("Cleaning up subscription channels");
      if (auctionsChannelsRef.current) {
        supabase.removeChannel(auctionsChannelsRef.current);
      }
    };
  }, [nft.collection_address, nft.token_id]);

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
    return <StartAuction nft={nft} auction={auction} />;
  }

  return <AuctionDetails auction={auction} accountAddress={account.address} />;
};
