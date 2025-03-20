import { ethers } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import { englishAuctionAbi } from "../../abis/EnglishAuction";
import { updateCreatedEnglishAuctions } from "./updateCreatedEnglishAuctions";
import { addNewEnglishAuctions } from "./addNewEnglishAuctions";
import { listenToBids } from "./listenToBids";
import { getExistingBids } from "./getExistingBids";

export async function setupEnglishAuctionIndexer(
  provider: ethers.providers.Provider,
  supabase: SupabaseClient<Database>,
  contractAddress: string,
  startBlock: number
) {
  const englishAuctionContract = new ethers.Contract(
    contractAddress,
    englishAuctionAbi,
    provider
  );

  await updateCreatedEnglishAuctions({
    englishAuctionContract,
    supabase,
    provider,
  });

  addNewEnglishAuctions({
    englishAuctionContract,
    supabase,
    provider,
  });

  listenToBids({
    englishAuctionContract,
    supabase,
    provider,
  });

  getExistingBids({
    englishAuctionContract,
    supabase,
    provider,
  });
}
