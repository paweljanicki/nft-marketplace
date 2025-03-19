export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: number;
          contract_address: string;
          name: string | null;
          symbol: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          contract_address: string;
          name?: string | null;
          symbol?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          contract_address?: string;
          name?: string | null;
          symbol?: string | null;
          created_at?: string;
        };
      };
      nfts: {
        Row: {
          id: number;
          collection_id: number | null;
          token_id: string;
          uri: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          collection_id?: number | null;
          token_id: string;
          uri?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          collection_id?: number | null;
          token_id?: string;
          uri?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      auction_house: {
        Row: {
          id: number;
          contract_address: string;
        };
        Insert: {
          id?: number;
          contract_address: string;
        };
        Update: {
          id?: number;
          contract_address?: string;
        };
      };
      auctions: {
        Row: {
          id: number;
          auction_house_id: number | null;
          contract_address: string;
          owner: string;
          nft_id: number | null;
          start_time: string | null;
          end_time: string | null;
          starting_price: string | null;
          highest_bid: string | null;
          highest_bidder: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          auction_house_id?: number | null;
          contract_address: string;
          owner: string;
          nft_id?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          starting_price?: string | null;
          highest_bid?: string | null;
          highest_bidder?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          auction_house_id?: number | null;
          contract_address?: string;
          owner?: string;
          nft_id?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          starting_price?: string | null;
          highest_bid?: string | null;
          highest_bidder?: string | null;
          status?: string | null;
          created_at?: string;
        };
      };
      bids: {
        Row: {
          id: number;
          auction_id: number;
          bidder: string;
          amount: string;
          withdrawn: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          auction_id: number;
          bidder: string;
          amount: string;
          withdrawn?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          auction_id?: number;
          bidder?: string;
          amount?: string;
          withdrawn?: boolean | null;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: number;
          contract_address: string;
          event_name: string;
          block_number: number;
          transaction_hash: string;
          log_index: number;
          params: Json | null;
          processed_at: string;
        };
        Insert: {
          id?: number;
          contract_address: string;
          event_name: string;
          block_number: number;
          transaction_hash: string;
          log_index: number;
          params?: Json | null;
          processed_at?: string;
        };
        Update: {
          id?: number;
          contract_address?: string;
          event_name?: string;
          block_number?: number;
          transaction_hash?: string;
          log_index?: number;
          params?: Json | null;
          processed_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
