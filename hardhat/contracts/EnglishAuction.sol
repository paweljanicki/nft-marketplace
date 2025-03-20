// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title EnglishAuction
 * @dev Implementation of an English auction for NFTs with indexer-friendly events
 */
contract EnglishAuction is ERC721Holder, ReentrancyGuard, Pausable, Ownable {
    // Auction struct - split into smaller structs to avoid stack depth issues
    struct AuctionCore {
        address nftContract;
        uint256 nftId;
        address payable seller;
        uint256 startingBid;
        uint256 endAt;
        bool started;
        bool ended;
    }
    
    struct AuctionBidInfo {
        address highestBidder;
        uint256 highestBid;
        uint256 bidsCount;
    }
    
    struct AuctionTimestamps {
        uint256 createdAt;
        uint256 startedAt;
        uint256 endedAt;
    }

    // Enhanced Events for Indexing
    event AuctionCreated(
        uint256 indexed auctionId, 
        address indexed seller, 
        address indexed nftContract, 
        uint256 nftId, 
        uint256 startingBid, 
        uint256 duration, 
        uint256 createdAt
    );
    
    event AuctionStarted(
        uint256 indexed auctionId, 
        uint256 startTime, 
        uint256 endTime
    );
    
    event BidPlaced(
        uint256 indexed auctionId, 
        address indexed bidder, 
        uint256 amount, 
        uint256 timestamp, 
        address previousBidder, 
        uint256 previousBid
    );
    
    event BidWithdrawn(
        uint256 indexed auctionId, 
        address indexed bidder, 
        uint256 amount, 
        uint256 timestamp
    );
    
    event AuctionEnded(
        uint256 indexed auctionId, 
        address indexed winner, 
        uint256 amount, 
        uint256 timestamp, 
        bool hadBids
    );
    
    event AuctionCancelled(
        uint256 indexed auctionId, 
        uint256 timestamp
    );
    
    event MinBidIncrementPercentageUpdated(
        uint256 oldMinBidIncrementPercentage, 
        uint256 newMinBidIncrementPercentage
    );
    
    event TimeBufferUpdated(
        uint256 oldTimeBuffer, 
        uint256 newTimeBuffer
    );
    
    event AuctionExtended(
        uint256 indexed auctionId, 
        uint256 oldEndTime, 
        uint256 newEndTime
    );

    event TestEvent(
        uint256 indexed auctionId, 
        address indexed seller, 
        address indexed sender,
        bool first, 
        bool second, 
        bool third
    );

    event AuctionStartStarted(
        uint256 auctionId
    );

    // State variables
    uint256 public auctionIdCounter;
    mapping(uint256 => AuctionCore) public auctionCores;
    mapping(uint256 => AuctionBidInfo) public auctionBidInfos;
    mapping(uint256 => AuctionTimestamps) public auctionTimestamps;
    mapping(uint256 => mapping(address => uint256)) public auctionBids;
    
    // Auction configuration
    uint256 public minBidIncrementPercentage = 5; // 5% minimum bid increment
    uint256 public timeBuffer = 5 minutes; // 5 minutes time extension
    
    // Indexing support mappings
    mapping(address => uint256[]) public userAuctions; // Seller's auctions
    mapping(address => uint256[]) public userBids; // Bidder's auction bids
    
    // Constructor
    constructor() Ownable(msg.sender) {}

    /**
     * @dev Creates a new auction for an NFT
     * @param _nftContract Address of the NFT contract
     * @param _nftId Token ID of the NFT
     * @param _startingBid Starting bid price
     * @param _duration Duration of the auction in seconds
     * @return The ID of the created auction
     */
    function createAuction(
        address _nftContract,
        uint256 _nftId,
        uint256 _startingBid,
        uint256 _duration
    ) external whenNotPaused returns (uint256) {
        // Currently anyone can create an auction, but only NFT owner can start it. This should be limited to NFT owner only
        require(_nftContract != address(0), "Invalid NFT address");
        require(_startingBid > 0, "Starting bid must be greater than zero");
        require(_duration >= 1 hours, "Auction must be at least 1 hour");

        uint256 auctionId = auctionIdCounter;
        auctionIdCounter++;

        // Store auction core data
        auctionCores[auctionId] = AuctionCore({
            nftContract: _nftContract,
            nftId: _nftId,
            seller: payable(msg.sender),
            startingBid: _startingBid,
            endAt: 0, // Will be set when auction starts
            started: false,
            ended: false
        });
        
        // Store auction bid info
        auctionBidInfos[auctionId] = AuctionBidInfo({
            highestBidder: address(0),
            highestBid: _startingBid,
            bidsCount: 0
        });
        
        // Store auction timestamps
        auctionTimestamps[auctionId] = AuctionTimestamps({
            createdAt: block.timestamp,
            startedAt: 0,
            endedAt: 0
        });
        
        // Add to user's auctions for indexing
        userAuctions[msg.sender].push(auctionId);

        emit AuctionCreated(
            auctionId,
            msg.sender,
            _nftContract,
            _nftId,
            _startingBid,
            _duration,
            block.timestamp
        );

        return auctionId;
    }

    /**
     * @dev Starts an auction by transferring the NFT to the contract
     * @param _auctionId The ID of the auction to start
     * @param _duration Duration of the auction in seconds
     */
    function startAuction(uint256 _auctionId, uint256 _duration) external whenNotPaused {
        emit AuctionStartStarted(_auctionId);
        
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        AuctionTimestamps storage timestamps = auctionTimestamps[_auctionId];

        emit TestEvent(
            _auctionId,
            auctionCore.seller,
            msg.sender,
            !auctionCore.started,
            msg.sender == auctionCore.seller,
            _duration >= 1 hours
        );
        
        require(!auctionCore.started, "Auction already started");
        require(msg.sender == auctionCore.seller, "Only seller can start auction");
        require(_duration >= 1 hours, "Auction must be at least 1 hour");

        IERC721(auctionCore.nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            auctionCore.nftId
        );

        auctionCore.started = true;
        auctionCore.endAt = block.timestamp + _duration;
        timestamps.startedAt = block.timestamp;

        emit AuctionStarted(
            _auctionId,
            block.timestamp,
            auctionCore.endAt
        );
    }

    /**
     * @dev Places a bid on an auction
     * @param _auctionId The ID of the auction to bid on
     */
    function placeBid(uint256 _auctionId) external payable nonReentrant whenNotPaused {
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        AuctionBidInfo storage bidInfo = auctionBidInfos[_auctionId];
        
        require(auctionCore.started, "Auction not started");
        require(!auctionCore.ended, "Auction already ended");
        require(block.timestamp < auctionCore.endAt, "Auction ended");
        require(msg.sender != auctionCore.seller, "Seller cannot bid");

        uint256 minBidRequired = bidInfo.highestBid + ((bidInfo.highestBid * minBidIncrementPercentage) / 100);
        require(msg.value >= minBidRequired, "Bid too low");

        address previousBidder = bidInfo.highestBidder;
        uint256 previousBid = bidInfo.highestBid;

        // If there was a previous bid, update the bidder's balance
        if (previousBidder != address(0)) {
            auctionBids[_auctionId][previousBidder] += previousBid;
        }

        // Update highest bid and bidder
        bidInfo.highestBidder = msg.sender;
        bidInfo.highestBid = msg.value;
        bidInfo.bidsCount++;
        
        // Add to user's bids for indexing
        userBids[msg.sender].push(_auctionId);

        // Extend auction if bid is made in last `timeBuffer` seconds
        uint256 oldEndTime = auctionCore.endAt;
        if (auctionCore.endAt - block.timestamp < timeBuffer) {
            auctionCore.endAt = block.timestamp + timeBuffer;
            emit AuctionExtended(_auctionId, oldEndTime, auctionCore.endAt);
        }

        emit BidPlaced(
            _auctionId, 
            msg.sender, 
            msg.value, 
            block.timestamp, 
            previousBidder, 
            previousBid
        );
    }

    /**
     * @dev Allows a bidder to withdraw their bid amount if they are not the highest bidder
     * @param _auctionId The ID of the auction
     */
    function withdrawBid(uint256 _auctionId) external nonReentrant {
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        AuctionBidInfo storage bidInfo = auctionBidInfos[_auctionId];
        
        require(auctionCore.started, "Auction not started");
        
        uint256 bidAmount = auctionBids[_auctionId][msg.sender];
        require(bidAmount > 0, "No bids to withdraw");
        
        // Ensure current highest bidder cannot withdraw their bid
        require(msg.sender != bidInfo.highestBidder, "Highest bidder cannot withdraw");

        // Reset user's bid balance before transfer to prevent reentrancy
        auctionBids[_auctionId][msg.sender] = 0;
        
        // Transfer bid amount back to bidder
        (bool success, ) = payable(msg.sender).call{value: bidAmount}("");
        require(success, "Transfer failed");

        emit BidWithdrawn(_auctionId, msg.sender, bidAmount, block.timestamp);
    }

    /**
     * @dev Ends an auction and transfers the NFT to the highest bidder
     * @param _auctionId The ID of the auction to end
     */
    function endAuction(uint256 _auctionId) external nonReentrant {
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        AuctionBidInfo storage bidInfo = auctionBidInfos[_auctionId];
        AuctionTimestamps storage timestamps = auctionTimestamps[_auctionId];
        
        require(auctionCore.started, "Auction not started");
        require(!auctionCore.ended, "Auction already ended");
        require(
            block.timestamp >= auctionCore.endAt || msg.sender == owner(),
            "Auction not yet ended and caller not owner"
        );

        auctionCore.ended = true;
        timestamps.endedAt = block.timestamp;
        bool hadBids = bidInfo.highestBidder != address(0);

        if (hadBids) {
            // Transfer NFT to highest bidder
            IERC721(auctionCore.nftContract).safeTransferFrom(
                address(this),
                bidInfo.highestBidder,
                auctionCore.nftId
            );
            
            // Transfer funds to seller
            (bool success, ) = auctionCore.seller.call{value: bidInfo.highestBid}("");
            require(success, "Transfer to seller failed");
        } else {
            // No bids were placed, return NFT to seller
            IERC721(auctionCore.nftContract).safeTransferFrom(
                address(this),
                auctionCore.seller,
                auctionCore.nftId
            );
        }

        emit AuctionEnded(
            _auctionId, 
            bidInfo.highestBidder, 
            bidInfo.highestBid, 
            block.timestamp,
            hadBids
        );
    }

    /**
     * @dev Cancels an auction that hasn't been started yet
     * @param _auctionId The ID of the auction to cancel
     */
    function cancelAuction(uint256 _auctionId) external {
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        AuctionTimestamps storage timestamps = auctionTimestamps[_auctionId];
        
        require(msg.sender == auctionCore.seller || msg.sender == owner(), "Only seller or owner can cancel");
        require(!auctionCore.started, "Auction already started");
        
        // Mark as ended to prevent future operations
        auctionCore.ended = true;
        timestamps.endedAt = block.timestamp;
        
        emit AuctionCancelled(_auctionId, block.timestamp);
    }

    /**
     * @dev Sets the minimum bid increment percentage
     * @param _minBidIncrementPercentage New minimum bid increment percentage (e.g., 5 for 5%)
     */
    function setMinBidIncrementPercentage(uint256 _minBidIncrementPercentage) external onlyOwner {
        require(_minBidIncrementPercentage > 0, "Min bid increment must be > 0");
        uint256 oldValue = minBidIncrementPercentage;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        emit MinBidIncrementPercentageUpdated(oldValue, _minBidIncrementPercentage);
    }

    /**
     * @dev Sets the time buffer for auction extensions
     * @param _timeBuffer New time buffer in seconds
     */
    function setTimeBuffer(uint256 _timeBuffer) external onlyOwner {
        uint256 oldValue = timeBuffer;
        timeBuffer = _timeBuffer;
        emit TimeBufferUpdated(oldValue, _timeBuffer);
    }

    /**
     * @dev Pauses the contract, preventing new auctions and bids
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Returns auction core information
     * @param _auctionId The ID of the auction
     */
    function getAuctionCore(uint256 _auctionId) external view returns (
        address nftContract,
        uint256 nftId,
        address seller,
        uint256 startingBid,
        uint256 endAt,
        bool started,
        bool ended
    ) {
        AuctionCore storage auctionCore = auctionCores[_auctionId];
        
        return (
            auctionCore.nftContract,
            auctionCore.nftId,
            auctionCore.seller,
            auctionCore.startingBid,
            auctionCore.endAt,
            auctionCore.started,
            auctionCore.ended
        );
    }

    /**
     * @dev Returns auction bid information
     * @param _auctionId The ID of the auction
     */
    function getAuctionBidInfo(uint256 _auctionId) external view returns (
        address highestBidder,
        uint256 highestBid,
        uint256 bidsCount
    ) {
        AuctionBidInfo storage bidInfo = auctionBidInfos[_auctionId];
        
        return (
            bidInfo.highestBidder,
            bidInfo.highestBid,
            bidInfo.bidsCount
        );
    }

    /**
     * @dev Returns auction timestamp information
     * @param _auctionId The ID of the auction
     */
    function getAuctionTimestamps(uint256 _auctionId) external view returns (
        uint256 createdAt,
        uint256 startedAt,
        uint256 endedAt
    ) {
        AuctionTimestamps storage timestamps = auctionTimestamps[_auctionId];
        
        return (
            timestamps.createdAt,
            timestamps.startedAt,
            timestamps.endedAt
        );
    }

    /**
     * @dev Returns all auctions created by a user
     * @param _user The address of the user
     * @return Array of auction IDs
     */
    function getUserAuctions(address _user) external view returns (uint256[] memory) {
        return userAuctions[_user];
    }

    /**
     * @dev Returns all auctions a user has bid on
     * @param _user The address of the user
     * @return Array of auction IDs
     */
    function getUserBids(address _user) external view returns (uint256[] memory) {
        return userBids[_user];
    }

    /**
     * @dev Returns the bid amount for a specific user on a specific auction
     * @param _auctionId The ID of the auction
     * @param _user The address of the user
     * @return The bid amount
     */
    function getUserBidAmount(uint256 _auctionId, address _user) external view returns (uint256) {
        return auctionBids[_auctionId][_user];
    }

    /**
     * @dev Returns the total number of auctions
     * @return The total number of auctions
     */
    function getTotalAuctions() external view returns (uint256) {
        return auctionIdCounter;
    }

    /**
     * @dev Returns active auctions (started but not ended)
     * @param _startIndex The starting index for pagination
     * @param _count The number of auctions to return
     * @return Array of auction IDs
     */
    function getActiveAuctions(uint256 _startIndex, uint256 _count) external view returns (uint256[] memory) {
        require(_startIndex < auctionIdCounter, "Start index out of bounds");
        
        uint256 resultCount = 0;
        uint256 i = _startIndex;
        
        // First pass: count active auctions
        while (i < auctionIdCounter && resultCount < _count) {
            AuctionCore storage auctionCore = auctionCores[i];
            if (auctionCore.started && !auctionCore.ended && block.timestamp < auctionCore.endAt) {
                resultCount++;
            }
            i++;
        }
        
        // Allocate array with the correct size
        uint256[] memory result = new uint256[](resultCount);
        
        // Second pass: populate the array
        resultCount = 0;
        i = _startIndex;
        while (i < auctionIdCounter && resultCount < _count) {
            AuctionCore storage auctionCore = auctionCores[i];
            if (auctionCore.started && !auctionCore.ended && block.timestamp < auctionCore.endAt) {
                result[resultCount] = i;
                resultCount++;
            }
            i++;
        }
        
        return result;
    }
}