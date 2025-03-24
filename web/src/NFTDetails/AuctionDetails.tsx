import { Box, Flex, Table, Text } from "@mantine/core";
import { IAuction, IBid } from "../shared/types";
import { useEffect, useRef, useState } from "react";
import supabase from "../shared/utils/supabase";
import { ShortAddress } from "../shared/components/ShortAddress";
import { PlaceBid } from "./PlaceBid";
import { Address, formatEther } from "viem";

export function AuctionDetails({
  auction,
  accountAddress,
}: {
  auction: IAuction;
  accountAddress: Address;
}): React.ReactElement {
  const [bids, setBids] = useState<IBid[]>([]);
  const bidsChannelRef = useRef<any>(null);

  useEffect(() => {
    async function fetchAuction() {
      const { error, data } = await supabase
        .from("bids")
        .select()
        .eq("auction_id", auction.auction_id)
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching bids", error);
      } else if (data.length === 0) {
        console.log("No bids found");
      } else {
        setBids(data);
      }
    }
    fetchAuction();

    bidsChannelRef.current = supabase
      .channel("bids")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids" },
        (payload) => {
          console.log("Change received!", payload);
          if (!payload.new) {
            return;
          }

          const newBid = payload.new as IBid;

          setBids((prevBids) => [newBid, ...prevBids]);
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscription channel");
      if (bidsChannelRef.current) {
        supabase.removeChannel(bidsChannelRef.current);
      }
    };
  }, []);

  if (!auction) {
    return <Text>No auction found</Text>;
  }

  const rows = bids.map((bid) => (
    <Table.Tr key={bid.timestamp + bid.bidder}>
      <Table.Td>
        <ShortAddress address={bid.bidder} />
      </Table.Td>
      <Table.Td>{formatEther(BigInt(bid.amount))} ETH</Table.Td>
      <Table.Td>{new Date(bid.timestamp).toLocaleString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      {auction.status === "STARTED" && auction.seller !== accountAddress && (
        <PlaceBid auction={auction} />
      )}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 8, sm: 32 }}
        align={{ base: "start", sm: "center" }}
        mb={32}
      >
        <Flex gap={4}>
          <Text fw={500}>Seller:</Text>
          <ShortAddress address={auction.seller} />
        </Flex>
        <Flex gap={4}>
          <Text fw={500}>Start Price:</Text>
          {formatEther(BigInt(auction.starting_bid))} ETH
        </Flex>
      </Flex>

      <Table.ScrollContainer minWidth={340}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Bidder</Table.Th>
              <Table.Th>Bid</Table.Th>
              <Table.Th>Timestamp</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
}
