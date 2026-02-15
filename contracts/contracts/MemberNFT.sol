// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemberNFT is ERC721URIStorage, Ownable{
    uint256 public tokenCounter;

    constructor(address initialOwner) ERC721("Crypto Corp Member Badge", "CCMB") Ownable(initialOwner){
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI)external onlyOwner returns(uint256){
        require(recipient != address(0), "Invalid recipient address!");
        uint256 newTokenId = tokenCounter;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenCounter ++;

        return newTokenId;
    }
}