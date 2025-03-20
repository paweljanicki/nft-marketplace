import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { nftAbi } from "../../abis/NFTAbi";

export async function addNewNFTs({
  nftContract, // specific NFT contract
  supabase,
  provider,
}: {
  nftContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  nftContract.on("Minted", async (owner, tokenId, metadataURI) => {
    console.log("New NFT contract created", owner, tokenId, metadataURI);
    const metadata = await fetch(metadataURI).then((res) => res.json());
    const imageURI = metadata.image;
    const name = metadata.name;
    const description = metadata.description;

    const { error } = await supabase.from("nfts").upsert([
      {
        collection_address: nftContract.address,
        token_id: Number(tokenId),
        owner,
        metadata_uri: metadataURI,
        image_uri: imageURI,
        name,
        description,
      },
    ]);
    if (error) {
      console.log("Error inserting new NFT", error);
      throw error;
    }
  });
}
