import { Address } from "viem";
import {
  useReadEnglishAuctionAuctionCores,
  useReadEnglishAuctionGetActiveAuctions,
  useReadEnglishAuctionGetTotalAuctions,
  useReadEnglishAuctionGetUserAuctions,
  useWriteEnglishAuctionCreateAuction,
  useWriteEnglishAuctionStartAuction,
} from "../contracts";
import { useAccount } from "wagmi";

export function EnglishAuction(): React.ReactElement {
  const account = useAccount();
  const ENGLISH_AUCTION_ADDRESS = import.meta.env
    .VITE_ENGLISH_AUCTION_CONTRACT as Address;

  const totalAuctions = useReadEnglishAuctionGetTotalAuctions({
    address: ENGLISH_AUCTION_ADDRESS,
  });

  const activeAuctions = useReadEnglishAuctionGetActiveAuctions({
    address: ENGLISH_AUCTION_ADDRESS,
    args: [BigInt(0), BigInt(100)],
  });

  const userAuctions = useReadEnglishAuctionGetUserAuctions({
    address: ENGLISH_AUCTION_ADDRESS,
    args: [account?.address || "0xa69be1F94c852874A067F6d0aC99317B6225797f"],
  });

  const auction0Core = useReadEnglishAuctionAuctionCores({
    address: ENGLISH_AUCTION_ADDRESS,
    args: [BigInt(0)],
  });

  console.log("Auction 0 core: ", auction0Core);

  const { writeContractAsync: callCreateAuction } =
    useWriteEnglishAuctionCreateAuction();

  const createAuction = async () => {
    await callCreateAuction({
      address: ENGLISH_AUCTION_ADDRESS as Address,
      args: [
        "0x3B4BC0F440c81fC8aC257b6D928F0dd96Ed4ea49",
        BigInt(2),
        BigInt(200),
        BigInt(36000),
      ],
    });
  };

  const { writeContractAsync: callStartAuction } =
    useWriteEnglishAuctionStartAuction();

  const startAuction = async () => {
    await callStartAuction({
      address: ENGLISH_AUCTION_ADDRESS as Address,
      args: [BigInt(0), BigInt(36000)],
      gas: BigInt(10000000),
    });
  };

  console.log(totalAuctions);

  return (
    <>
      EnglishAuction
      <div>
        Total auctions:{" "}
        {totalAuctions?.isSuccess ? totalAuctions?.data.toString() : "loading"}
      </div>
      <div>
        Active auctions:{" "}
        {activeAuctions?.isSuccess
          ? activeAuctions?.data.map((item) => item.toString()).join(", ")
          : "loading"}
      </div>
      <div>
        User auctions IDs:{" "}
        {userAuctions?.isSuccess
          ? userAuctions?.data.map((item) => item.toString()).join(", ")
          : "loading"}
      </div>
      <button onClick={createAuction}>Create</button>
      <button onClick={startAuction}>Start</button>
    </>
  );
}
