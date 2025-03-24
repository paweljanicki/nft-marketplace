import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Holder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721HolderAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721URIStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721UriStorageAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EnglishAuction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const englishAuctionAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nftContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nftId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startingBid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'duration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'createdAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'hadBids', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'AuctionEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'oldEndTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newEndTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionExtended',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionStartStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'previousBidder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'previousBid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BidWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldMinBidIncrementPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newMinBidIncrementPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinBidIncrementPercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'first', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'second', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'third', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TestEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldTimeBuffer',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newTimeBuffer',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TimeBufferUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'auctionBidInfos',
    outputs: [
      { name: 'highestBidder', internalType: 'address', type: 'address' },
      { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
      { name: 'bidsCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'auctionBids',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'auctionCores',
    outputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'nftId', internalType: 'uint256', type: 'uint256' },
      { name: 'seller', internalType: 'address payable', type: 'address' },
      { name: 'startingBid', internalType: 'uint256', type: 'uint256' },
      { name: 'endAt', internalType: 'uint256', type: 'uint256' },
      { name: 'started', internalType: 'bool', type: 'bool' },
      { name: 'ended', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'auctionIdCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'auctionTimestamps',
    outputs: [
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'startedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'endedAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftContract', internalType: 'address', type: 'address' },
      { name: '_nftId', internalType: 'uint256', type: 'uint256' },
      { name: '_startingBid', internalType: 'uint256', type: 'uint256' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAuction',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'endAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startIndex', internalType: 'uint256', type: 'uint256' },
      { name: '_count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getActiveAuctions',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuctionBidInfo',
    outputs: [
      { name: 'highestBidder', internalType: 'address', type: 'address' },
      { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
      { name: 'bidsCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuctionCore',
    outputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'nftId', internalType: 'uint256', type: 'uint256' },
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'startingBid', internalType: 'uint256', type: 'uint256' },
      { name: 'endAt', internalType: 'uint256', type: 'uint256' },
      { name: 'started', internalType: 'bool', type: 'bool' },
      { name: 'ended', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuctionTimestamps',
    outputs: [
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'startedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'endedAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalAuctions',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserAuctions',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_auctionId', internalType: 'uint256', type: 'uint256' },
      { name: '_user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserBidAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserBids',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minBidIncrementPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_minBidIncrementPercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMinBidIncrementPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_timeBuffer', internalType: 'uint256', type: 'uint256' }],
    name: 'setTimeBuffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_auctionId', internalType: 'uint256', type: 'uint256' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'timeBuffer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userAuctions',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userBids',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawBid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC4906
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc4906Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: 'collectionCID', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Minted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCollectionCID',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTokensCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenURI_', internalType: 'string', type: 'string' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newCID', internalType: 'string', type: 'string' }],
    name: 'setCollectionCID',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NFTFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftFactoryAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'collectionCID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'NFTContractCreated',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'contractsByOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'collectionCID', internalType: 'string', type: 'string' },
    ],
    name: 'createNFTContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deployedContracts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getContractsByOwner',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getContractsCountByOwner',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDeployedContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDeployedContractsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableAbi = [
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCast
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCastAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'int256', type: 'int256' },
    ],
    name: 'SafeCastOverflowedIntDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'int256', type: 'int256' }],
    name: 'SafeCastOverflowedIntToUint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'SafeCastOverflowedUintToInt',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
  { type: 'error', inputs: [], name: 'StringsInvalidAddressFormat' },
  { type: 'error', inputs: [], name: 'StringsInvalidChar' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const useReadErc165 = /*#__PURE__*/ createUseReadContract({
  abi: erc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useReadErc721 = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadErc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadErc721TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWriteErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc721TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useSimulateErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc721Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc721Abi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWatchErc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721HolderAbi}__
 */
export const useWriteErc721Holder = /*#__PURE__*/ createUseWriteContract({
  abi: erc721HolderAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721HolderAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteErc721HolderOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721HolderAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721HolderAbi}__
 */
export const useSimulateErc721Holder = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721HolderAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721HolderAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateErc721HolderOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721HolderAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__
 */
export const useReadErc721UriStorage = /*#__PURE__*/ createUseReadContract({
  abi: erc721UriStorageAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc721UriStorageBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadErc721UriStorageGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc721UriStorageIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc721UriStorageName = /*#__PURE__*/ createUseReadContract({
  abi: erc721UriStorageAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadErc721UriStorageOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc721UriStorageSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc721UriStorageSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadErc721UriStorageTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721UriStorageAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721UriStorageAbi}__
 */
export const useWriteErc721UriStorage = /*#__PURE__*/ createUseWriteContract({
  abi: erc721UriStorageAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc721UriStorageApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721UriStorageAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc721UriStorageSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721UriStorageAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc721UriStorageSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721UriStorageAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc721UriStorageTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721UriStorageAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721UriStorageAbi}__
 */
export const useSimulateErc721UriStorage =
  /*#__PURE__*/ createUseSimulateContract({ abi: erc721UriStorageAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc721UriStorageApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721UriStorageAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc721UriStorageSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721UriStorageAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc721UriStorageSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721UriStorageAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc721UriStorageTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721UriStorageAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__
 */
export const useWatchErc721UriStorageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: erc721UriStorageAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc721UriStorageApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721UriStorageAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc721UriStorageApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721UriStorageAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchErc721UriStorageBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721UriStorageAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchErc721UriStorageMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721UriStorageAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721UriStorageAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc721UriStorageTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721UriStorageAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__
 */
export const useReadEnglishAuction = /*#__PURE__*/ createUseReadContract({
  abi: englishAuctionAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"auctionBidInfos"`
 */
export const useReadEnglishAuctionAuctionBidInfos =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'auctionBidInfos',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"auctionBids"`
 */
export const useReadEnglishAuctionAuctionBids =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'auctionBids',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"auctionCores"`
 */
export const useReadEnglishAuctionAuctionCores =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'auctionCores',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"auctionIdCounter"`
 */
export const useReadEnglishAuctionAuctionIdCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'auctionIdCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"auctionTimestamps"`
 */
export const useReadEnglishAuctionAuctionTimestamps =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'auctionTimestamps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getActiveAuctions"`
 */
export const useReadEnglishAuctionGetActiveAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getActiveAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getAuctionBidInfo"`
 */
export const useReadEnglishAuctionGetAuctionBidInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getAuctionBidInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getAuctionCore"`
 */
export const useReadEnglishAuctionGetAuctionCore =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getAuctionCore',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getAuctionTimestamps"`
 */
export const useReadEnglishAuctionGetAuctionTimestamps =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getAuctionTimestamps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getTotalAuctions"`
 */
export const useReadEnglishAuctionGetTotalAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getTotalAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getUserAuctions"`
 */
export const useReadEnglishAuctionGetUserAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getUserAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getUserBidAmount"`
 */
export const useReadEnglishAuctionGetUserBidAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getUserBidAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"getUserBids"`
 */
export const useReadEnglishAuctionGetUserBids =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'getUserBids',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"minBidIncrementPercentage"`
 */
export const useReadEnglishAuctionMinBidIncrementPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'minBidIncrementPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"owner"`
 */
export const useReadEnglishAuctionOwner = /*#__PURE__*/ createUseReadContract({
  abi: englishAuctionAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"paused"`
 */
export const useReadEnglishAuctionPaused = /*#__PURE__*/ createUseReadContract({
  abi: englishAuctionAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"timeBuffer"`
 */
export const useReadEnglishAuctionTimeBuffer =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'timeBuffer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"userAuctions"`
 */
export const useReadEnglishAuctionUserAuctions =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'userAuctions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"userBids"`
 */
export const useReadEnglishAuctionUserBids =
  /*#__PURE__*/ createUseReadContract({
    abi: englishAuctionAbi,
    functionName: 'userBids',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__
 */
export const useWriteEnglishAuction = /*#__PURE__*/ createUseWriteContract({
  abi: englishAuctionAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"cancelAuction"`
 */
export const useWriteEnglishAuctionCancelAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'cancelAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"createAuction"`
 */
export const useWriteEnglishAuctionCreateAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'createAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"endAuction"`
 */
export const useWriteEnglishAuctionEndAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'endAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteEnglishAuctionOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteEnglishAuctionPause = /*#__PURE__*/ createUseWriteContract(
  { abi: englishAuctionAbi, functionName: 'pause' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"placeBid"`
 */
export const useWriteEnglishAuctionPlaceBid =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'placeBid',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteEnglishAuctionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 */
export const useWriteEnglishAuctionSetMinBidIncrementPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'setMinBidIncrementPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"setTimeBuffer"`
 */
export const useWriteEnglishAuctionSetTimeBuffer =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'setTimeBuffer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"startAuction"`
 */
export const useWriteEnglishAuctionStartAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'startAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteEnglishAuctionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteEnglishAuctionUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"withdrawBid"`
 */
export const useWriteEnglishAuctionWithdrawBid =
  /*#__PURE__*/ createUseWriteContract({
    abi: englishAuctionAbi,
    functionName: 'withdrawBid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__
 */
export const useSimulateEnglishAuction =
  /*#__PURE__*/ createUseSimulateContract({ abi: englishAuctionAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"cancelAuction"`
 */
export const useSimulateEnglishAuctionCancelAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'cancelAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"createAuction"`
 */
export const useSimulateEnglishAuctionCreateAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'createAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"endAuction"`
 */
export const useSimulateEnglishAuctionEndAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'endAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateEnglishAuctionOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateEnglishAuctionPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"placeBid"`
 */
export const useSimulateEnglishAuctionPlaceBid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'placeBid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateEnglishAuctionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"setMinBidIncrementPercentage"`
 */
export const useSimulateEnglishAuctionSetMinBidIncrementPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'setMinBidIncrementPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"setTimeBuffer"`
 */
export const useSimulateEnglishAuctionSetTimeBuffer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'setTimeBuffer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"startAuction"`
 */
export const useSimulateEnglishAuctionStartAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'startAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateEnglishAuctionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateEnglishAuctionUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link englishAuctionAbi}__ and `functionName` set to `"withdrawBid"`
 */
export const useSimulateEnglishAuctionWithdrawBid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: englishAuctionAbi,
    functionName: 'withdrawBid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__
 */
export const useWatchEnglishAuctionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: englishAuctionAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionCancelled"`
 */
export const useWatchEnglishAuctionAuctionCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionCreated"`
 */
export const useWatchEnglishAuctionAuctionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionEnded"`
 */
export const useWatchEnglishAuctionAuctionEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionExtended"`
 */
export const useWatchEnglishAuctionAuctionExtendedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionExtended',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionStartStarted"`
 */
export const useWatchEnglishAuctionAuctionStartStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionStartStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"AuctionStarted"`
 */
export const useWatchEnglishAuctionAuctionStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'AuctionStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"BidPlaced"`
 */
export const useWatchEnglishAuctionBidPlacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'BidPlaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"BidWithdrawn"`
 */
export const useWatchEnglishAuctionBidWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'BidWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"MinBidIncrementPercentageUpdated"`
 */
export const useWatchEnglishAuctionMinBidIncrementPercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'MinBidIncrementPercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchEnglishAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchEnglishAuctionPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"TestEvent"`
 */
export const useWatchEnglishAuctionTestEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'TestEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"TimeBufferUpdated"`
 */
export const useWatchEnglishAuctionTimeBufferUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'TimeBufferUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link englishAuctionAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchEnglishAuctionUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: englishAuctionAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const useReadIerc165 = /*#__PURE__*/ createUseReadContract({
  abi: ierc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__
 */
export const useReadIerc4906 = /*#__PURE__*/ createUseReadContract({
  abi: ierc4906Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc4906BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc4906Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc4906GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: ierc4906Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc4906IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc4906Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc4906OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc4906Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc4906SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc4906Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc4906Abi}__
 */
export const useWriteIerc4906 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc4906Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc4906Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc4906Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc4906SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc4906Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc4906SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc4906Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc4906TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc4906Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc4906Abi}__
 */
export const useSimulateIerc4906 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc4906Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc4906Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc4906Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc4906SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc4906Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc4906SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc4906Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc4906Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc4906TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc4906Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__
 */
export const useWatchIerc4906Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc4906Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc4906ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc4906Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc4906ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc4906Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchIerc4906BatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc4906Abi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchIerc4906MetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc4906Abi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc4906Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc4906TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc4906Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useReadIerc721 = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useWriteIerc721 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721TransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: ierc721Abi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useSimulateIerc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useWatchIerc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useReadIerc721Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721MetadataGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721MetadataIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc721MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721MetadataOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721MetadataSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc721MetadataSymbol = /*#__PURE__*/ createUseReadContract(
  { abi: ierc721MetadataAbi, functionName: 'symbol' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadIerc721MetadataTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useWriteIerc721Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useSimulateIerc721Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useWatchIerc721MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721MetadataApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const useWriteIerc721Receiver = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721ReceiverAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteIerc721ReceiverOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721ReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const useSimulateIerc721Receiver =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721ReceiverAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateIerc721ReceiverOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721ReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useReadNft = /*#__PURE__*/ createUseReadContract({ abi: nftAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getCollectionCID"`
 */
export const useReadNftGetCollectionCid = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getCollectionCID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getTokensCount"`
 */
export const useReadNftGetTokensCount = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getTokensCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadNftIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"name"`
 */
export const useReadNftName = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadNftSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useWriteNft = /*#__PURE__*/ createUseWriteContract({ abi: nftAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteNftSafeTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: nftAbi, functionName: 'safeTransferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setCollectionCID"`
 */
export const useWriteNftSetCollectionCid = /*#__PURE__*/ createUseWriteContract(
  { abi: nftAbi, functionName: 'setCollectionCID' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteNftTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useSimulateNft = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateNftApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateNftMint = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setCollectionCID"`
 */
export const useSimulateNftSetCollectionCid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'setCollectionCID',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__
 */
export const useWatchNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: nftAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Minted"`
 */
export const useWatchNftMintedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: nftAbi, eventName: 'Minted' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__
 */
export const useReadNftFactory = /*#__PURE__*/ createUseReadContract({
  abi: nftFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"contractsByOwner"`
 */
export const useReadNftFactoryContractsByOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'contractsByOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"deployedContracts"`
 */
export const useReadNftFactoryDeployedContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'deployedContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"getContractsByOwner"`
 */
export const useReadNftFactoryGetContractsByOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'getContractsByOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"getContractsCountByOwner"`
 */
export const useReadNftFactoryGetContractsCountByOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'getContractsCountByOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"getDeployedContracts"`
 */
export const useReadNftFactoryGetDeployedContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'getDeployedContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"getDeployedContractsCount"`
 */
export const useReadNftFactoryGetDeployedContractsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: nftFactoryAbi,
    functionName: 'getDeployedContractsCount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftFactoryAbi}__
 */
export const useWriteNftFactory = /*#__PURE__*/ createUseWriteContract({
  abi: nftFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"createNFTContract"`
 */
export const useWriteNftFactoryCreateNftContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftFactoryAbi,
    functionName: 'createNFTContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftFactoryAbi}__
 */
export const useSimulateNftFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: nftFactoryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftFactoryAbi}__ and `functionName` set to `"createNFTContract"`
 */
export const useSimulateNftFactoryCreateNftContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftFactoryAbi,
    functionName: 'createNFTContract',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftFactoryAbi}__
 */
export const useWatchNftFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: nftFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftFactoryAbi}__ and `eventName` set to `"NFTContractCreated"`
 */
export const useWatchNftFactoryNftContractCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftFactoryAbi,
    eventName: 'NFTContractCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__
 */
export const useReadPausable = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPausablePaused = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__
 */
export const useWatchPausableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPausablePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPausableUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Unpaused',
  })
