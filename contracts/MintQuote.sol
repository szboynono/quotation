//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintQuote is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 listingPrice = 0.002 ether; 

    constructor() ERC721("Quotations", "QUOTE") {}

    function createToken(string memory tokenURI) public payable returns (uint) {
      require(msg.value == listingPrice, "Not enough ETH sent; check price!"); 
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      return newTokenId;
    }

    function getMintingFee() public view returns (uint) {
        return listingPrice;
    }

    function setMintingFee(uint256 fee) public onlyOwner {
        listingPrice = fee;
    }

    function getBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function withdrawMoney() public onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
    }
}