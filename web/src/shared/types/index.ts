export interface ICollection {
  contract_address: string;
  name: string;
  symbol: string;
  owner: string;
  collection_cid: string;
  created_at: string;
}

export interface INFT {
  token_id: number;
  owner: string;
  metadata_uri: string;
  collection_address: string;
  image_uri: string;
  name: string;
  description: string;
}

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
