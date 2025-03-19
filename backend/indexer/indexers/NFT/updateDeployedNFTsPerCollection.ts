import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { nftAbi } from "../../abis/NFTAbi";

export async function updateDeployedNFTsPerCollection({
  contract, // specific NFT contract
  supabase,
  provider,
}: {
  contract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  const deployedNFTsIds: number[] = await contract.getDeployedNFTsIds();
  console.log("Deployed NFTs ids", deployedNFTsIds);

  const deployedNFTs = await Promise.all(
    deployedNFTsIds.map(async (id) => {
      const [name, description, owner, metadataURI] = await Promise.all([
        contract.getName(id),
        contract.getDescription(id),
        contract.ownerOf(id),
        contract.getMetadataURI(id),
      ]);
      return {
        id,
        name,
        description,
        owner,
        metadata_uri: metadataURI,
      };
    })
  );

  console.log("Deployed NFTs", deployedNFTs);

  const { error } = await supabase.from("nfts").upsert(deployedNFTs);

  if (error) {
    throw error;
  }
}
