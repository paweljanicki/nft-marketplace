import { ethers } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import { nftFactoryAbi } from "../../abis/NFTFactoryAbi";
import { updateDeployedCollections } from "./updateDeployedCollections";
import { addNewCollections } from "./addNewCollections";

export async function setupNFTFactoryIndexer(
  provider: ethers.providers.Provider,
  supabase: SupabaseClient<Database>,
  contractAddress: string,
  startBlock: number
) {
  const contract = new ethers.Contract(
    contractAddress,
    nftFactoryAbi,
    provider
  );

  await updateDeployedCollections({
    nftFactoryContract: contract,
    supabase,
    provider,
  });

  await addNewCollections({
    nftFactoryContract: contract,
    supabase,
    provider,
  });
}
