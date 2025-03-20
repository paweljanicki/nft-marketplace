import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { nftAbi } from "../../abis/NFTAbi";

export async function updateNFTsOfDeployedCollections({
  nftFactoryContract,
  supabase,
  provider,
}: {
  nftFactoryContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  const deployedCollectionsAddresses: string[] =
    await nftFactoryContract.getDeployedContracts();
  console.log("Deployed collections addresses", deployedCollectionsAddresses);

  // get next token id for each collection

  const mintedCollectionNFTs = await Promise.all(
    deployedCollectionsAddresses.map(async (address) => {
      const contract = new ethers.Contract(address, nftAbi, provider);
      const [tokensCount] = await Promise.all([contract.getTokensCount()]);
      return {
        contract_address: address,
        tokensCount: tokensCount.toNumber(),
      };
    })
  );

  console.log("Minted Collection NFTS", mintedCollectionNFTs);

  mintedCollectionNFTs.forEach(async (collection) => {
    const contract = new ethers.Contract(
      collection.contract_address,
      nftAbi,
      provider
    );

    const nfts = await Promise.all(
      Array.from(Array(collection.tokensCount).keys()).map(async (index) => {
        const tokenId = index + 1;
        const [owner, metadataURI] = await Promise.all([
          contract.ownerOf(BigInt(tokenId)),
          contract.tokenURI(BigInt(tokenId)),
        ]);
        const metadata = await fetch(metadataURI).then((res) => res.json());
        const imageURI = metadata.image;
        const name = metadata.name;
        const description = metadata.description;

        console.log("Image URI", imageURI);
        return {
          token_id: tokenId,
          owner,
          metadata_uri: metadataURI,
          collection_address: collection.contract_address,
          image_uri: imageURI,
          name,
          description,
        };
      })
    );

    console.log("NFTs", nfts);

    const { error } = await supabase.from("nfts").upsert(nfts);

    if (error) {
      console.log("Error upserting" + collection.contract_address, error);
      throw error;
    }
  });
}
