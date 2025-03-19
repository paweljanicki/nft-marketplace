import {
  nftFactoryAbi,
  useReadErc721TokenUri,
  useReadNftOwner,
  useReadNftOwnerOf,
  useWriteNftFactoryCreateNftContract,
  useWriteNftMint,
} from "../contracts";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import { parseEventLogs } from "viem";

export const Contracts = () => {
  const nftContract = import.meta.env.VITE_NFT_CONTRACT_2;

  const contractOwner = useReadNftOwner({
    address: nftContract,
  });

  // const currentTokenId = useReadNftGetCurrentTokenId({
  //   address: nftContract,
  // });

  const token1Uri = useReadErc721TokenUri({
    address: nftContract,
    args: [BigInt(1)],
  });

  const token1Owner = useReadNftOwnerOf({
    address: nftContract,
    args: [BigInt(1)],
  });

  const { writeContractAsync } = useWriteNftMint();

  const mintNFT = async () => {
    const to = import.meta.env.VITE_SECONDARY_LOCAL_ADDRESS;
    if (!to) {
      throw new Error("Secondary address not found");
    }

    await writeContractAsync({
      address: nftContract,
      args: [
        to,
        "https://ipfs.io/ipfs/bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq",
      ],
    });
  };

  const { writeContractAsync: createNFTCollection } =
    useWriteNftFactoryCreateNftContract();

  const createNFT = async () => {
    const factoryContract = import.meta.env.VITE_NFT_FACTORY_CONTRACT;
    if (!factoryContract) {
      throw new Error("Factory contract not found");
    }

    const txHash = await createNFTCollection({
      address: factoryContract,
      args: ["Newest", "NWST", "https://ipfs.io/ipfs/asd"],
    });

    console.log(txHash);

    try {
      console.log(`Transaction submitted: ${txHash}`);

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });

      console.log("Transaction receipt:", transactionReceipt);

      // Parse logs to get contract address
      const logs = parseEventLogs({
        abi: nftFactoryAbi,
        eventName: "NFTContractCreated",
        logs: transactionReceipt.logs,
      });

      if (logs && logs.length > 0) {
        const newContractAddress = logs[0].args.contractAddress;
        console.log(`NFT Contract deployed at: ${newContractAddress}`);
        return newContractAddress;
      }

      throw new Error("Could not find NFTContractCreated event in logs");
    } catch (error) {
      console.error("Error creating NFT contract:", error);
    }
  };

  return (
    <div>
      <h3>Contracts</h3>
      <div>Address:{nftContract}</div>
      <div>
        Owner:{contractOwner.isSuccess ? contractOwner.data : "not found"}
      </div>
      {/* <div>
        Current Token Id:
        {currentTokenId.isSuccess
          ? currentTokenId.data.toString()
          : "not found"}
      </div> */}
      <div>
        Token 1 Uri:{token1Uri.isSuccess ? token1Uri.data : "not found"}
      </div>
      <div>
        Token 1 Owner:
        {token1Owner.isSuccess ? token1Owner.data : "not found"}
      </div>
      <div>
        <button onClick={mintNFT}>Mint</button>
      </div>
      <div>
        <button onClick={createNFT}>Create NFT Collection</button>
      </div>
    </div>
  );
};
