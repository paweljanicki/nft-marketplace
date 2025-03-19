import { Contract, ethers } from "ethers";
import { Database } from "../../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { nftAbi } from "../../abis/NFTAbi";

export async function updateDeployedCollections({
  nftFactoryContract: contract,
  supabase,
  provider,
}: {
  nftFactoryContract: Contract;
  supabase: SupabaseClient<Database>;
  provider: ethers.providers.Provider;
}) {
  const deployedCollectionsAddresses: string[] =
    await contract.getDeployedContracts();
  console.log("Deployed collections addresses", deployedCollectionsAddresses);

  const deployedCollections = await Promise.all(
    deployedCollectionsAddresses.map(async (address) => {
      const contract = new ethers.Contract(address, nftAbi, provider);
      const [name, symbol, owner] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.owner(),
      ]);
      return { contract_address: address, name, symbol, owner };
    })
  );

  console.log("Deployed collections", deployedCollections);

  const { error } = await supabase
    .from("collections")
    .upsert(deployedCollections);

  if (error) {
    throw error;
  }
}
