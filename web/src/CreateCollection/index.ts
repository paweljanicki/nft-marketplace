import { Address, parseEventLogs } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import { nftFactoryAbi } from "../contracts";

export async function extractContractAddressFromTransaction(txHash: Address) {
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
}
