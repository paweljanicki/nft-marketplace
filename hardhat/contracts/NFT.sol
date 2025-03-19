// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    string private _collectionCID;

    /**
     * @dev Constructor to initialize the contract
     * @param name The name of the NFT collection
     * @param symbol The symbol of the NFT collection
     * @param initialOwner The address that will be set as the owner of the contract
     */
    constructor(
        string memory name, 
        string memory symbol,
        address initialOwner,
        string memory collectionCID
    ) ERC721(name, symbol) Ownable(initialOwner) {
        _nextTokenId = 1; // Start token IDs at 1
        _collectionCID = collectionCID;
    }

    /**
     * @dev Mints a new token with a custom URI
     * @param to The address that will own the minted token
     * @param tokenURI_ The URI containing the metadata for the token (IPFS link)
     * @return tokenId The ID of the newly minted token
     */
    function mint(address to, string memory tokenURI_) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        
        return tokenId;
    }

    /**
     * @dev Returns tokens count
     * @return The current value of _nextTokenId - 1
     */
    function getTokensCount() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    /**
     * @dev Override functions to combine ERC721 and ERC721URIStorage
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setCollectionCID(string memory newCID) public onlyOwner {
        _collectionCID = newCID;
    }

    function getCollectionCID() public view returns (string memory) {
        return _collectionCID;
    }
}