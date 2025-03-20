// import { Button, Flex, Stack, Text, Title } from "@mantine/core";
// import { INFT } from "../shared/types";
// import { useAccount } from "wagmi";
// import {
//   useReadEnglishAuctionGetActiveAuctions,
//   useWriteEnglishAuctionCreateAuction,
//   useWriteEnglishAuctionStartAuction,
//   useWriteNftApprove,
// } from "../contracts";
// import { Address } from "viem";

// export function NFTAuction({ nft }: { nft: INFT }): React.ReactElement {
//   const ENGLISH_AUCTION_ADDRESS = import.meta.env
//     .VITE_ENGLISH_AUCTION_CONTRACT as Address;
//   const account = useAccount();

//   const activeAuctions = useReadEnglishAuctionGetActiveAuctions({
//     address: ENGLISH_AUCTION_ADDRESS,
//     args: [BigInt(0), BigInt(100)], // search first 100 auctions, which is fine for now
//   });

//   const { writeContractAsync: callApproveNFTTransferToAuctionContract } =
//     useWriteNftApprove();

//   const approveEnglishAuction = async () => {
//     await callApproveNFTTransferToAuctionContract({
//       address: nft.collection_address as Address,
//       args: [ENGLISH_AUCTION_ADDRESS, BigInt(nft.token_id)],
//     });
//   };

//   const { writeContractAsync: callStartAuction } =
//     useWriteEnglishAuctionStartAuction();

//   const { writeContractAsync: callCreateAuction } =
//     useWriteEnglishAuctionCreateAuction();

//   const createAuction = async () => {
//     await callCreateAuction({
//       address: ENGLISH_AUCTION_ADDRESS as Address,
//       args: [
//         nft.collection_address as Address,
//         BigInt(nft.token_id),
//         BigInt(1000),
//         BigInt(36000),
//       ], // 1000 starting bid, 10 hours auction duration
//     });
//   };

//   const startAuction = async () => {
//     await approveEnglishAuction();
//     await callStartAuction({
//       address: ENGLISH_AUCTION_ADDRESS as Address,
//       args: [BigInt(nft.token_id), BigInt(36000)], // 10 hours auction duration
//     });
//   };

//   console.log("Active auctions: ", activeAuctions);

//   const isActive = activeAuctions?.data?.find(
//     (item) => item === BigInt(nft.token_id)
//   )
//     ? "true"
//     : "false";

//   return (
//     <Stack>
//       <Title order={2}>Auction</Title>
//       <Text>The auction hasn't started yet.</Text>
//       <Text>Is active: {isActive}</Text>
//       {account?.address === nft.owner && (
//         <Flex>
//           <Button onClick={createAuction}>Create auction</Button>
//           <Button onClick={startAuction}>Start auction</Button>
//         </Flex>
//       )}
//     </Stack>
//   );
// }
