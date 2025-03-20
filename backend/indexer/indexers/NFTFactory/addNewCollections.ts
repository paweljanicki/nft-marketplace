import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { nftAbi } from "../../abis/NFTAbi";
import { addNewNFTs } from "../NFT/addNewNFTs";

export async function addNewCollections({
  nftFactoryContract,
  supabase,
  provider,
}: {
  nftFactoryContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  nftFactoryContract.on(
    "NFTContractCreated",
    async (contractAddress, name, symbol, owner, collectionCID) => {
      console.log(
        "New NFT contract created",
        contractAddress,
        name,
        symbol,
        owner,
        collectionCID
      );
      const { error } = await supabase.from("collections").upsert([
        {
          contract_address: contractAddress,
          name,
          symbol,
          owner,
          collection_cid: collectionCID,
        },
      ]);
      if (error) {
        throw error;
      }

      addNewNFTs({
        nftContract: new ethers.Contract(contractAddress, nftAbi, provider),
        supabase,
        provider,
      });
    }
  );
}
