import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export async function saveEvent(
  supabase: SupabaseClient<Database>,
  contractAddress: string,
  eventName: string,
  blockNumber: number,
  transactionHash: string,
  logIndex: number,
  params: any
) {
  try {
    const { error } = await supabase.from("events").upsert({
      contract_address: contractAddress,
      event_name: eventName,
      block_number: blockNumber,
      transaction_hash: transactionHash,
      log_index: logIndex,
      params,
    });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(
      `Failed to save event ${eventName} for ${contractAddress}:`,
      error
    );
    throw error;
  }
}
