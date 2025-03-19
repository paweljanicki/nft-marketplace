// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./NFT.sol";

/**
 * @title NFTFactory
 * @dev Factory contract that allows anyone to deploy their own NFT collection
 */

contract NFTFactory {
    // Event emitted when a new NFT contract is created
    event NFTContractCreated(address contractAddress, string name, string symbol, address owner);
    
    // Array to keep track of all deployed contracts
    address[] public deployedContracts;
    
    // Mapping from owner address to their deployed contracts
    mapping(address => address[]) public contractsByOwner;

    /**
     * @dev Creates a new NFT contract
     * @param name The name of the NFT collection
     * @param symbol The symbol of the NFT collection
     * @return The address of the newly deployed NFT contract
     */
    function createNFTContract(string memory name, string memory symbol) public returns (address) {
        // Deploy a new NFT contract with the caller as the owner
        NFT newNFTContract = new NFT(name, symbol, msg.sender);
        
        // Store the new contract address
        address contractAddress = address(newNFTContract);
        deployedContracts.push(contractAddress);
        contractsByOwner[msg.sender].push(contractAddress);
        
        // Emit an event
        emit NFTContractCreated(contractAddress, name, symbol, msg.sender);
        
        return contractAddress;
    }
    
    /**
     * @dev Returns the number of contracts deployed by this factory
     */
    function getDeployedContractsCount() public view returns (uint256) {
        return deployedContracts.length;
    }

    /**
     * @dev Returns all contracts deployed by this factory
     */
    function getDeployedContracts() public view returns (address[] memory) {
        return deployedContracts;
    }
    
    /**
     * @dev Returns all contracts deployed by a specific owner
     * @param owner The address of the owner
     */
    function getContractsByOwner(address owner) public view returns (address[] memory) {
        return contractsByOwner[owner];
    }
    
    /**
     * @dev Returns the number of contracts deployed by a specific owner
     * @param owner The address of the owner
     */
    function getContractsCountByOwner(address owner) public view returns (uint256) {
        return contractsByOwner[owner].length;
    }
}