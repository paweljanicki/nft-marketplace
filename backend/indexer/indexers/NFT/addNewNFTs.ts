import { Contract } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function addNewNFTs({
  nftContract, // specific NFT contract
  supabase,
}: {
  nftContract: Contract;
  supabase: SupabaseClient<Database>;
}) {
  nftContract.on("Minted", async (owner, tokenId, metadataURI) => {
    console.log("New NFT contract created", owner, tokenId, metadataURI);

    // Handle NFT created with invalid metadata URI
    let metadata;
    try {
      const res = await fetch(metadataURI);
      metadata = await res.json();
    } catch (error) {
      console.log(
        `Error fetching metadata for ${nftContract.address}, tokenId ${tokenId}:`,
        error
      );
    }

    // Handle NFT created with invalid metadata
    const imageURI = metadata && metadata.image ? metadata.image : "";
    const name = metadata && metadata.name ? metadata.name : "Name not found";
    const description =
      metadata && metadata.description
        ? metadata.description
        : "Invalid NFT metadata. Please check the metadata URI. Description not found.";

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
