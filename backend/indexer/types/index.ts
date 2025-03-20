export interface IAuction {
  auction_id: number;
  collection_address: string;
  token_id: number;
  seller: string;
  starting_bid: string;
  status: string;
  highest_bidder: string | null;
  highest_bid: string | null;
  bids_count: number;
}

export interface IBid {
  auction_id: number;
  bidder: string;
  amount: string;
  timestamp: string;
}
