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
        BigInt(1000000000000), // starting bid in wei
        BigInt(3600), // duration in seconds
      ],
    });
  };
  return (
    <div>
      <Button onClick={createAuction}>Create Auction</Button>
    </div>
  );
}
