import { ethers } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import { saveEvent } from "../../utils/events";
import { nftFactoryAbi } from "../../abis/NFTFactoryAbi";
import { nftAbi } from "../../abis/NFTAbi";
import { updateNFTsOfDeployedCollections } from "./updateNFTsOfDeployedCollections";
import { addNewNFTs } from "./addNewNFTs";

export async function setupNFTIndexer(
  provider: ethers.providers.Provider,
  supabase: SupabaseClient<Database>,
  contractAddress: string,
  startBlock: number
) {
  const nftFactoryContract = new ethers.Contract(
    contractAddress,
    nftFactoryAbi,
    provider
  );

  await updateNFTsOfDeployedCollections({
    nftFactoryContract,
    supabase,
    provider,
  });

  const deployedCollectionsAddresses: string[] =
    await nftFactoryContract.getDeployedContracts();
  console.log("Deployed collections addresses", deployedCollectionsAddresses);

  deployedCollectionsAddresses.forEach(async (address) => {
    const nftContract = new ethers.Contract(address, nftAbi, provider);

    await addNewNFTs({
      nftContract,
      supabase,
      provider,
    });
  });
}
