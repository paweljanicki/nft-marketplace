import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("EnglishAuction", function () {
  // Contract instances
  let auction: any;
  let mockNFT: any;

  // Accounts
  let owner: any;
  let seller: any;
  let bidder1: any;
  let bidder2: any;
  let bidder3: any;
  let addresses: any;

  // Test constants
  const STARTING_BID = hre.ethers.parseEther("0.1");
  const HIGHER_BID = hre.ethers.parseEther("0.15");
  const EVEN_HIGHER_BID = hre.ethers.parseEther("0.2");
  const DEFAULT_AUCTION_DURATION = 60 * 60 * 24; // 24 hours in seconds
  const NFT_ID = 1n;
  const NFT_URI = "ipfs://QmZz1/1";
  const COLLECTION_CID = "QmZz1";

  before(async function () {
    // Get signers
    [owner, seller, bidder1, bidder2, bidder3, ...addresses] =
      await hre.ethers.getSigners();
  });

  beforeEach(async function () {
    // Deploy a mock NFT contract for testing
    const MockNFT = await hre.ethers.getContractFactory("NFT");
    mockNFT = await MockNFT.deploy(
      "TestNFT",
      "TNFT",
      owner.address,
      COLLECTION_CID
    );
    await mockNFT.waitForDeployment();

    // Mint NFT to seller
    await mockNFT.mint(seller.address, NFT_URI);

    // Deploy EnglishAuction contract
    const EnglishAuction = await hre.ethers.getContractFactory(
      "EnglishAuction"
    );
    auction = await EnglishAuction.deploy();
    await auction.waitForDeployment();

    // Approve auction contract to transfer NFT
    await mockNFT.connect(seller).approve(await auction.getAddress(), NFT_ID);
  });

  describe("Contract Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await auction.owner()).to.equal(owner.address);
    });

    it("Should initialize with correct default values", async function () {
      expect(await auction.minBidIncrementPercentage()).to.equal(5);
      expect(await auction.timeBuffer()).to.equal(5 * 60); // 5 minutes
      expect(await auction.auctionIdCounter()).to.equal(0);
    });
  });

  describe("createAuction", function () {
    it("Should create a new auction with correct parameters", async function () {
      await expect(
        auction
          .connect(seller)
          .createAuction(
            await mockNFT.getAddress(),
            NFT_ID,
            STARTING_BID,
            DEFAULT_AUCTION_DURATION
          )
      )
        .to.emit(auction, "AuctionCreated")
        .withArgs(
          0, // auctionId
          seller.address, // seller
          await mockNFT.getAddress(), // nftContract
          NFT_ID, // nftId
          STARTING_BID, // startingBid
          DEFAULT_AUCTION_DURATION, // duration
          await time.latest() // createdAt (approx)
        );

      // Check auction data
      const auctionCore = await auction.getAuctionCore(0);
      expect(auctionCore[0]).to.equal(await mockNFT.getAddress()); // nftContract
      expect(auctionCore[1]).to.equal(NFT_ID); // nftId
      expect(auctionCore[2]).to.equal(seller.address); // seller
      expect(auctionCore[3]).to.equal(STARTING_BID); // startingBid
      expect(auctionCore[5]).to.equal(false); // started
      expect(auctionCore[6]).to.equal(false); // ended
    });

    it("Should reject auction creation with invalid parameters", async function () {
      // Zero NFT address
      await expect(
        auction
          .connect(seller)
          .createAuction(
            "0x0000000000000000000000000000000000000000",
            NFT_ID,
            STARTING_BID,
            DEFAULT_AUCTION_DURATION
          )
      ).to.be.revertedWith("Invalid NFT address");

      // Zero starting bid
      await expect(
        auction
          .connect(seller)
          .createAuction(
            await mockNFT.getAddress(),
            NFT_ID,
            0,
            DEFAULT_AUCTION_DURATION
          )
      ).to.be.revertedWith("Starting bid must be greater than zero");

      // Duration too short
      await expect(
        auction.connect(seller).createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          30 * 60 // 30 minutes
        )
      ).to.be.revertedWith("Auction must be at least 1 hour");
    });

    it("Should increment auction counter after creation", async function () {
      expect(await auction.auctionIdCounter()).to.equal(0);

      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );

      expect(await auction.auctionIdCounter()).to.equal(1);

      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );

      expect(await auction.auctionIdCounter()).to.equal(2);
    });

    it("Should track user auctions correctly", async function () {
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );

      const userAuctions = await auction.getUserAuctions(seller.address);
      expect(userAuctions.length).to.equal(1);
      expect(userAuctions[0]).to.equal(0);
    });
  });

  describe("startAuction", function () {
    let auctionId: any;

    beforeEach(async function () {
      // Create auction
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      auctionId = 0;
    });

    it("Should start auction properly", async function () {
      const currentTimestamp = await time.latest();

      await expect(
        auction
          .connect(seller)
          .startAuction(auctionId, DEFAULT_AUCTION_DURATION)
      ).to.emit(auction, "AuctionStarted");

      // Check auction data after start
      const auctionCore = await auction.getAuctionCore(auctionId);
      expect(auctionCore[5]).to.equal(true); // started
      expect(auctionCore[6]).to.equal(false); // ended
      expect(Number(auctionCore[4])).to.be.approximately(
        currentTimestamp + DEFAULT_AUCTION_DURATION,
        5
      ); // endAt

      // Check NFT transferred to contract
      expect(await mockNFT.ownerOf(NFT_ID)).to.equal(
        await auction.getAddress()
      );

      // Check timestamps
      const timestamps = await auction.getAuctionTimestamps(auctionId);
      expect(Number(timestamps[1])).to.be.approximately(currentTimestamp, 5); // startedAt
    });

    it("Should prevent non-seller from starting auction", async function () {
      await expect(
        auction
          .connect(bidder1)
          .startAuction(auctionId, DEFAULT_AUCTION_DURATION)
      ).to.be.revertedWith("Only seller can start auction");
    });

    it("Should prevent starting already started auction", async function () {
      // Start auction first time
      await auction
        .connect(seller)
        .startAuction(auctionId, DEFAULT_AUCTION_DURATION);

      // Try to start again
      await expect(
        auction
          .connect(seller)
          .startAuction(auctionId, DEFAULT_AUCTION_DURATION)
      ).to.be.revertedWith("Auction already started");
    });

    it("Should reject starting with too short duration", async function () {
      await expect(
        auction.connect(seller).startAuction(
          auctionId,
          30 * 60 // 30 minutes
        )
      ).to.be.revertedWith("Auction must be at least 1 hour");
    });
  });

  describe("placeBid", function () {
    let auctionId: any;

    beforeEach(async function () {
      // Create and start auction
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      auctionId = 0;
      await auction
        .connect(seller)
        .startAuction(auctionId, DEFAULT_AUCTION_DURATION);
    });

    it("Should accept valid first bid", async function () {
      const tx = await auction
        .connect(bidder1)
        .placeBid(auctionId, { value: HIGHER_BID });
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      await expect(tx).to.emit(auction, "BidPlaced").withArgs(
        auctionId,
        bidder1.address,
        HIGHER_BID,
        eventTimestamp,
        "0x0000000000000000000000000000000000000000", // previous bidder (none)
        STARTING_BID // previous bid
      );

      // Check bid info
      const bidInfo = await auction.getAuctionBidInfo(auctionId);
      expect(bidInfo[0]).to.equal(bidder1.address); // highestBidder
      expect(bidInfo[1]).to.equal(HIGHER_BID); // highestBid
      expect(bidInfo[2]).to.equal(1); // bidsCount
    });

    it("Should accept higher subsequent bid", async function () {
      // Place first bid
      await auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID });

      const tx = await auction
        .connect(bidder2)
        .placeBid(auctionId, { value: EVEN_HIGHER_BID });
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      // Place higher bid
      await expect(tx)
        .to.emit(auction, "BidPlaced")
        .withArgs(
          auctionId,
          bidder2.address,
          EVEN_HIGHER_BID,
          eventTimestamp,
          bidder1.address,
          HIGHER_BID
        );

      // Check bid info updated
      const bidInfo = await auction.getAuctionBidInfo(auctionId);
      expect(bidInfo[0]).to.equal(bidder2.address); // highestBidder
      expect(bidInfo[1]).to.equal(EVEN_HIGHER_BID); // highestBid
      expect(bidInfo[2]).to.equal(2); // bidsCount

      // First bidder should have their bid recorded for withdrawal
      expect(
        await auction.getUserBidAmount(auctionId, bidder1.address)
      ).to.equal(HIGHER_BID);
    });

    it("Should reject bids that are too low", async function () {
      // First bid needs to be at least startingBid
      await expect(
        auction.connect(bidder1).placeBid(auctionId, {
          value: hre.ethers.parseEther("0.05"), // Less than starting bid
        })
      ).to.be.revertedWith("Bid too low");

      // Place first bid
      await auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID });

      // Second bid needs to be at least 5% higher
      const minIncrement = (HIGHER_BID * 5n) / 100n;
      const tooSmallBid = HIGHER_BID + minIncrement - 1n;

      await expect(
        auction.connect(bidder2).placeBid(auctionId, {
          value: tooSmallBid,
        })
      ).to.be.revertedWith("Bid too low");
    });

    it("Should reject bids from seller", async function () {
      await expect(
        auction.connect(seller).placeBid(auctionId, {
          value: HIGHER_BID,
        })
      ).to.be.revertedWith("Seller cannot bid");
    });

    it("Should reject bids for non-started auctions", async function () {
      // Create another auction but don't start it
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      const newAuctionId = 1;

      await expect(
        auction.connect(bidder1).placeBid(newAuctionId, {
          value: HIGHER_BID,
        })
      ).to.be.revertedWith("Auction not started");
    });

    it("Should reject bids for ended auctions", async function () {
      // End auction
      await time.increase(DEFAULT_AUCTION_DURATION + 1);
      await auction.connect(seller).endAuction(auctionId);

      await expect(
        auction.connect(bidder1).placeBid(auctionId, {
          value: HIGHER_BID,
        })
      ).to.be.revertedWith("Auction already ended");
    });

    it("Should extend auction when bid placed near end time", async function () {
      // Move time forward to near end
      await time.increase(DEFAULT_AUCTION_DURATION - 60); // 1 minute before end

      const auctionCoreBefore = await auction.getAuctionCore(auctionId);
      const endAtBefore = auctionCoreBefore[4];

      // Place a bid
      await expect(
        auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID })
      ).to.emit(auction, "AuctionExtended");

      const auctionCoreAfter = await auction.getAuctionCore(auctionId);
      const endAtAfter = auctionCoreAfter[4];

      // End time should be extended by timeBuffer (5 minutes)
      expect(Number(endAtAfter - endAtBefore)).to.be.approximately(
        5 * 60 - 60,
        5
      );
    });

    it("Should track user bids correctly", async function () {
      await auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID });

      const userBids = await auction.getUserBids(bidder1.address);
      expect(userBids.length).to.equal(1);
      expect(userBids[0]).to.equal(0);
    });
  });

  describe("withdrawBid", function () {
    let auctionId: any;

    beforeEach(async function () {
      // Create and start auction
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      auctionId = 0;
      await auction
        .connect(seller)
        .startAuction(auctionId, DEFAULT_AUCTION_DURATION);

      // Place bids
      await auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID });
      await auction
        .connect(bidder2)
        .placeBid(auctionId, { value: EVEN_HIGHER_BID });
    });

    it("Should allow outbid user to withdraw their bid", async function () {
      const initialBalance = await hre.ethers.provider.getBalance(
        bidder1.address
      );
      const bidAmount = await auction.getUserBidAmount(
        auctionId,
        bidder1.address
      );

      const tx = await auction.connect(bidder1).withdrawBid(auctionId);
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      await expect(tx)
        .to.emit(auction, "BidWithdrawn")
        .withArgs(auctionId, bidder1.address, bidAmount, eventTimestamp);

      // Bid amount should be reset
      expect(
        await auction.getUserBidAmount(auctionId, bidder1.address)
      ).to.equal(0);

      // Bidder should receive their funds back
      const newBalance = await hre.ethers.provider.getBalance(bidder1.address);

      // Account for gas costs in the check
      expect(newBalance).to.be.gt(initialBalance);
    });

    // it("Should prevent highest bidder from withdrawing", async function () {
    //   await expect(
    //     auction.connect(bidder2).withdrawBid(auctionId)
    //   ).to.be.revertedWith("Highest bidder cannot withdraw");
    // });

    it("Should prevent withdrawal with no bid", async function () {
      await expect(
        auction.connect(bidder3).withdrawBid(auctionId)
      ).to.be.revertedWith("No bids to withdraw");
    });

    it("Should prevent multiple withdrawals", async function () {
      // First withdrawal should succeed
      await auction.connect(bidder1).withdrawBid(auctionId);

      // Second attempt should fail
      await expect(
        auction.connect(bidder1).withdrawBid(auctionId)
      ).to.be.revertedWith("No bids to withdraw");
    });
  });

  describe("endAuction", function () {
    let auctionId: any;

    beforeEach(async function () {
      // Create and start auction
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      auctionId = 0;
      await auction
        .connect(seller)
        .startAuction(auctionId, DEFAULT_AUCTION_DURATION);
    });

    it("Should end auction with bids and transfer NFT to winner", async function () {
      // Place bid
      await auction.connect(bidder1).placeBid(auctionId, { value: HIGHER_BID });

      // Move time forward past auction end
      await time.increase(DEFAULT_AUCTION_DURATION + 1);

      const sellerBalanceBefore = await hre.ethers.provider.getBalance(
        seller.address
      );

      const tx = await auction.connect(bidder2).endAuction(auctionId);
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      // End auction
      await expect(tx)
        .to.emit(auction, "AuctionEnded")
        .withArgs(auctionId, bidder1.address, HIGHER_BID, eventTimestamp, true);

      // Check auction marked as ended
      const auctionCore = await auction.getAuctionCore(auctionId);
      expect(auctionCore[6]).to.equal(true); // ended

      // Check timestamps
      const timestamps = await auction.getAuctionTimestamps(auctionId);
      expect(Number(timestamps[2])).to.be.approximately(await time.latest(), 5); // endedAt

      // Check NFT transferred to winner
      expect(await mockNFT.ownerOf(NFT_ID)).to.equal(bidder1.address);

      // Check seller received payment
      const sellerBalanceAfter = await hre.ethers.provider.getBalance(
        seller.address
      );
      expect(sellerBalanceAfter - sellerBalanceBefore).to.equal(HIGHER_BID);
    });

    it("Should end auction with no bids and return NFT to seller", async function () {
      // No bids placed

      // Move time forward past auction end
      await time.increase(DEFAULT_AUCTION_DURATION + 1);

      const tx = await auction.connect(bidder1).endAuction(auctionId);
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      // End auction
      await expect(tx).to.emit(auction, "AuctionEnded").withArgs(
        auctionId,
        "0x0000000000000000000000000000000000000000", // No winner
        STARTING_BID, // Starting bid
        eventTimestamp,
        false // No bids
      );

      // Check NFT returned to seller
      expect(await mockNFT.ownerOf(NFT_ID)).to.equal(seller.address);
    });

    it("Should prevent ending before auction duration expires", async function () {
      // Try to end before time expires (non-owner)
      await expect(
        auction.connect(bidder1).endAuction(auctionId)
      ).to.be.revertedWith("Auction not yet ended and caller not owner");
    });

    it("Should allow owner to end auction early", async function () {
      // Owner should be able to end early
      await auction.connect(owner).endAuction(auctionId);

      // Check auction marked as ended
      const auctionCore = await auction.getAuctionCore(auctionId);
      expect(auctionCore[6]).to.equal(true); // ended
    });

    it("Should prevent ending already ended auction", async function () {
      // End auction first time
      await time.increase(DEFAULT_AUCTION_DURATION + 1);
      await auction.connect(seller).endAuction(auctionId);

      // Try to end again
      await expect(
        auction.connect(seller).endAuction(auctionId)
      ).to.be.revertedWith("Auction already ended");
    });
  });

  describe("cancelAuction", function () {
    let auctionId: any;

    beforeEach(async function () {
      // Create but don't start auction
      await auction
        .connect(seller)
        .createAuction(
          await mockNFT.getAddress(),
          NFT_ID,
          STARTING_BID,
          DEFAULT_AUCTION_DURATION
        );
      auctionId = 0;
    });

    it("Should allow seller to cancel auction", async function () {
      const tx = await auction.connect(seller).cancelAuction(auctionId);
      const receipt = await tx.wait();
      const block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const eventTimestamp = block.timestamp;

      await expect(tx)
        .to.emit(auction, "AuctionCancelled")
        .withArgs(auctionId, eventTimestamp);

      // Check auction marked as ended
      const auctionCore = await auction.getAuctionCore(auctionId);
      expect(auctionCore[6]).to.equal(true); // ended

      // Check timestamps
      const timestamps = await auction.getAuctionTimestamps(auctionId);
      expect(Number(timestamps[2])).to.be.approximately(await time.latest(), 5); // endedAt
    });

    it("Should allow owner to cancel auction", async function () {
      await expect(auction.connect(owner).cancelAuction(auctionId)).to.emit(
        auction,
        "AuctionCancelled"
      );

      // Check auction marked as ended
      const auctionCore = await auction.getAuctionCore(auctionId);
      expect(auctionCore[6]).to.equal(true); // ended
    });

    it("Should prevent non-seller/non-owner from canceling", async function () {
      await expect(
        auction.connect(bidder1).cancelAuction(auctionId)
      ).to.be.revertedWith("Only seller or owner can cancel");
    });

    it("Should prevent canceling started auction", async function () {
      // Start the auction
      await auction
        .connect(seller)
        .startAuction(auctionId, DEFAULT_AUCTION_DURATION);

      // Try to cancel
      await expect(
        auction.connect(seller).cancelAuction(auctionId)
      ).to.be.revertedWith("Auction already started");
    });
  });

  describe("Owner functions", function () {
    it("Should update minBidIncrementPercentage", async function () {
      const newValue = 10;

      await expect(
        auction.connect(owner).setMinBidIncrementPercentage(newValue)
      )
        .to.emit(auction, "MinBidIncrementPercentageUpdated")
        .withArgs(5, newValue);

      expect(await auction.minBidIncrementPercentage()).to.equal(newValue);
    });

    it("Should prevent setting minBidIncrementPercentage to zero", async function () {
      await expect(
        auction.connect(owner).setMinBidIncrementPercentage(0)
      ).to.be.revertedWith("Min bid increment must be > 0");
    });

    it("Should update timeBuffer", async function () {
      const newValue = 10 * 60; // 10 minutes

      await expect(auction.connect(owner).setTimeBuffer(newValue))
        .to.emit(auction, "TimeBufferUpdated")
        .withArgs(5 * 60, newValue);

      expect(await auction.timeBuffer()).to.equal(newValue);
    });
  });
});
