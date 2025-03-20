import { Address } from "viem";
import {
  useWriteEnglishAuctionStartAuction,
  useWriteNftApprove,
} from "../contracts";
import { INFT } from "../shared/types";
import { Button } from "@mantine/core";

const ENGLISH_AUCTION_ADDRESS = import.meta.env
  .VITE_ENGLISH_AUCTION_CONTRACT as Address;

export function StartAuction({ nft }: { nft: INFT }): React.ReactElement {
  const { writeContractAsync: callApproveNFTTransferToAuctionContract } =
    useWriteNftApprove();

  const approveEnglishAuction = async () => {
    await callApproveNFTTransferToAuctionContract({
      address: nft.collection_address as Address,
      args: [ENGLISH_AUCTION_ADDRESS, BigInt(nft.token_id)],
    });
  };

  const { writeContractAsync: callStartAuction } =
    useWriteEnglishAuctionStartAuction();

  const startAuction = async () => {
    await approveEnglishAuction();
    await callStartAuction({
      address: ENGLISH_AUCTION_ADDRESS as Address,
      args: [BigInt(nft.token_id), BigInt(36000)], // duration in seconds
    });
  };

  return (
    <div>
      <Button onClick={startAuction}>Start Auction</Button>
    </div>
  );
}
