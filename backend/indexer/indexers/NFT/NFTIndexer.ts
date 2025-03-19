import { ethers } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import { saveEvent } from "../../utils/events";
import { nftFactoryAbi } from "../../abis/NFTFactoryAbi";
import { nftAbi } from "../../abis/NFTAbi";

export async function setupNFTIndexer(
  provider: ethers.providers.Provider,
  supabase: SupabaseClient<Database>,
  contractAddress: string,
  startBlock: number
) {
  const factoryContract = new ethers.Contract(
    contractAddress,
    nftFactoryAbi,
    provider
  );

  const deployedCollectionsAddresses: string[] =
    await factoryContract.getDeployedContracts();
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

        console.log("Image URI", imageURI);
        return {
          token_id: tokenId,
          owner,
          metadata_uri: metadataURI,
          collection_address: collection.contract_address,
          image_uri: imageURI,
        };
      })
    );

    console.log("NFTs", nfts);

    const { error } = await supabase.from("nfts").upsert(nfts);

    if (error) {
      throw error;
    }
  });

  // get all nfts for each collection that is their metadataURI and token id

  // store all nfts in supabase
}
