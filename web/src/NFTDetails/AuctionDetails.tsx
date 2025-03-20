import { Box, Button, Flex, Text } from "@mantine/core";
import { IAuction } from "../shared/types";
import { useWriteEnglishAuctionPlaceBid } from "../contracts";
import { Address } from "viem";

const ENGLISH_AUCTION_ADDRESS = import.meta.env
  .VITE_ENGLISH_AUCTION_CONTRACT as Address;

export function AuctionDetails({
  auction,
}: {
  auction: IAuction;
}): React.ReactElement {
  const { writeContractAsync: callPlaceBid } = useWriteEnglishAuctionPlaceBid();

  const placeBid = async () => {
    await callPlaceBid({
      address: ENGLISH_AUCTION_ADDRESS,
      args: [BigInt(auction.auction_id)],
      value: BigInt(110000000),
    });
  };

  return (
    <Box>
      <Text>Seller: {auction.seller}</Text>
      <Text>Start Price: {auction.starting_bid}</Text>
      <Text>Highest Bid: {auction.highest_bid}</Text>
      <Text>Highest Bidder: {auction.highest_bidder}</Text>

      <Flex>
        <Button onClick={placeBid}>Place Bid</Button>
      </Flex>
    </Box>
  );
}
