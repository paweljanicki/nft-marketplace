# NFT Marketplace

This is a mono repo for a NFT marketplace, build with Solidity, Hardhat, React, Typescript, Postgres and Supabase.

## Overview

The repo consists of 3 distinct parts:

1. web - React + Typescript + Wagmi + Viem dApp
2. hardhat - hardhat project with smart contracts
3. backend - an indexer which stores data in Postgres database. Supabase functions to upload files to IPFS (Pinata)

### dApp overview

The dApp is deployed on <a href="https://nft-marketplace-chi-livid.vercel.app" target="_blank" rel="noopener noreferrer">https://nft-marketplace-chi-livid.vercel.app</a> and supports to Base Sepolia

You can browse the collections and NFTs. To deploy a collection, mint NFTs and take part in a auction, please connect your wallet.

Collections page, display all collections

![Collections](images/screen-collections.png)

Collection details page, displays all NFTs in the collection

![Collection](images/screen-collection.png)

NFT page - displays details about NFT and auction for that NFT

![Auction](images/screen-auction.png)

### Smart contracts

Smart contracts are deployed on Base Sepolia

1. [NFTFactory](/hardhat/contracts/NFTFactory.sol) contract - used to deploy erc721 like contracts <a href="https://base-sepolia.blockscout.com/address/0xbc9979F1bb405565D789e2f70a60e4cA044eA9c3" target="_blank" rel="noopener noreferrer">0xbc9979F1bb405565D789e2f70a60e4cA044eA9c3</a>

2. [EnglishAuction contract](/hardhat/contracts/EnglishAuction.sol) - used to create, start, manage and bid on NFT auctions <a href="https://base-sepolia.blockscout.com/address/0x0D9e4EF64799398Ae55FbF45e5DaDa068A73a02C" target="_blank" rel="noopener noreferrer">0x0D9e4EF64799398Ae55FbF45e5DaDa068A73a02C</a>

3. [NFT contracts](/hardhat/contracts/NFT.sol) - erc721 based contracts - are deployed on demand using the NFTFactory contract

### Indexer

The indexer is build with Typescript, Ethers and Postgres (Supabase)

Indexer starting point is in [backend/indexer/index.ts](/backend/indexer/index.ts) file. There are 3 different indexers running:

1. [NFTFactoryIndexer](/backend/indexer/indexers/NFTFactory/NFTFactoryIndexer.ts) - On start it fetches all deployed NFT collections and then listens to newly deployed collections from NFTFactory contract

2. [NFTIndexer](/backend/indexer/indexers/NFT/NFTIndexer.ts) - On start it fetches all minted NFTs from all collections. Then it listens to newly minted NFTs from all collections

3. [EnglishAuctionIndexer](/backend/indexer/indexers/EnglishAuction/EnglishAuctionIndexer.ts) - On start it fetches all existing auctions and the listens to new bids and auction events

## Development

### Development Setup Instructions:

1. `cd` into each directory, and run `npm ci`
2. create `.env` (or `.env.local`) file in each directory by copying `.env.example` from the respective directory, renaming it and adding required environment variables (You can leave out smart contract addresses for now, as they will be deployed in later steps)
3. For supabase setup you need to create your own supabase project and link it to `backend` directory, using supabase CLI. Refer to supabase CLI documentation
4. After linking supabase project, create `.env` file in `/backend/supabase` directory, by coping `.env.example` and supplying it with real values
5. You can deploy supabase functions by running `npm run functions:deploy` in `/backend` directory
6. To setup your Supabase Postgres database, use `/backend/supabase/schema.sql`
7. To deploy your own smart contract `cd hardhat` and use npm scripts. If you want to deploy to Base Sepolia use `npm run deploy:factory:base` and `npm run deploy:auction:base`
8. After deployed NFTFactory and EnglishAuction smart contracts (e.g. by running commands in the step above), you can add them to `.env` in `/backend` and `.env.local` in `/web` directory

### Start development environment

1. `cd backend` and run `npm run dev` to start the indexer. Indexer will read data from the contracts as well as listen to events and update the database.
2. `cd web` and run `npm run dev` to start the React app
3. If you want to actively develop smart contracts, run `npm run contracts:watch` in the `/web` directory, to fetch ABI changes. This uses wagmi CLI to get ABI changes as well as generate React hooks for interacting with smart contracts.
