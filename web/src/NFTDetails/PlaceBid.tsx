import { Address, formatEther, parseEther, parseUnits } from "viem";
import { useWriteEnglishAuctionPlaceBid } from "../contracts";
import { IAuction } from "../shared/types";
import { Button, Flex, NumberInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

const ENGLISH_AUCTION_ADDRESS = import.meta.env
  .VITE_ENGLISH_AUCTION_CONTRACT as Address;

export function PlaceBid({
  auction,
}: {
  auction: IAuction;
}): React.ReactElement {
  const highestBid = BigInt(auction.highest_bid);
  const minimumBid = (highestBid * 105n + 99n) / 100n; // Rounds up
  const formattedMinimumBid = Number(formatEther(minimumBid));

  const form = useForm<{ bid: number }>({
    initialValues: {
      bid: formattedMinimumBid,
    },
  });

  const { writeContractAsync: callPlaceBid } = useWriteEnglishAuctionPlaceBid();

  const handleSubmit = async (value: { bid: number }) => {
    const weiValue = parseUnits(value.bid.toString(), 18);

    console.log("Parsed bid", weiValue);
    await callPlaceBid({
      address: ENGLISH_AUCTION_ADDRESS,
      args: [BigInt(auction.auction_id)],
      value: weiValue,
    });
  };

  return (
    <Flex my={16}>
      <form
        onSubmit={form.onSubmit(async (value) => {
          handleSubmit(value);
        })}
      >
        <Flex gap={16} align="center">
          <Title order={2}>Place Bid</Title>
          <NumberInput
            {...form.getInputProps("bid")}
            placeholder="Enter bid amount"
            min={formattedMinimumBid}
            max={100}
            step={0.001}
          />
          <Button type="submit">Place Bid</Button>
        </Flex>
      </form>
    </Flex>
  );
}
