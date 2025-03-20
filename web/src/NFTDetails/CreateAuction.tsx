import { Address } from "viem";
import { useWriteEnglishAuctionCreateAuction } from "../contracts";
import { INFT } from "../shared/types";
import { Button } from "@mantine/core";

const ENGLISH_AUCTION_ADDRESS = import.meta.env
  .VITE_ENGLISH_AUCTION_CONTRACT as Address;

export function CreateAuction({ nft }: { nft: INFT }): React.ReactElement {
  const { writeContractAsync: callCreateAuction } =
    useWriteEnglishAuctionCreateAuction();

  const createAuction = async () => {
    await callCreateAuction({
      address: ENGLISH_AUCTION_ADDRESS,
      args: [
        nft.collection_address as Address,
        BigInt(nft.token_id),
        BigInt(1000),
        BigInt(36000),
      ], // 1000 starting bid, 10 hours auction duration
    });
  };
  return (
    <div>
      <h1>CreateAuction</h1>
      <Button onClick={createAuction}>Create Auction</Button>
    </div>
  );
}
