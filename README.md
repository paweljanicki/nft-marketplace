# NFT Marketplace

This is a mono repo for a NFT marketplace, build with Solidity, Hardhat, React and Typescript.

The repo consists of 3 distinct parts:

1. web - React + Typescript + Wagmi + Viem dApp
2. hardhat - hardhat project with smart contracts
3. backend - an indexer which stores data in Postgres database. Supabase functions to upload files to IPFS (Pinata)

### Setup Instructions:

1. `cd` into each directory, and run `npm ci`
2. create `.env` (or `.env.local`) file in each directory by copying `.env.example` from the respective directory, renaming it and adding required environment variables (You can leave out smart contract addresses for now, as they will be deployed in later steps)
3. For supabase setup you need to create your own supabase project and link it to `backend` directory, using supabase CLI. Refer to supabase CLI documentation
4. After linking supabase project, create `.env` file in `/backend/supabase` directory, by coping `.env.example` and supplying it with real values
5. You can deploy supabase functions by running `npm run functions:deploy` in `/backend` directory
6. To deploy your own smart contract `cd hardhat` and use npm scripts. If you want to deploy to Base Sepolia use `npm run deploy:factory:base` and `npm run deploy:auction:base`
7. After deployed NFTFactory and EnglishAuction smart contracts (e.g. by running commands in the step above), you can add them to `.env` in `/backend` and `.env.local` in `/web` directory

### Start development environment

1. `cd backend` and run `npm run dev` to start the indexer. Indexer will read data from the contracts as well as listen to events and update the database.
2. `cd web` and run `npm run dev` to start the React app
3. If you want to actively develop smart contracts, run `npm run contracts:watch` in the `/web` directory, to fetch ABI changes. This uses wagmi CLI to get ABI changes as well as generate React hooks for interacting with smart contracts.
