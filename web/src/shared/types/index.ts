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
}
