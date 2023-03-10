//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract MyNFTContract is ERC721A, Ownable {

    uint256 _currentIndex;
    constructor() ERC721A("_NFTContract", "_NFT") {}

    mapping(uint256 => address) public _ownerOf;
    mapping(uint256 => string) public _tokenURIs;
    string public _baseTokenURI;
    string private _tokenURI;
    
    //minting multiple NFTs and assigning tokenURIs
    function mint(address minter, uint256 quantity) external payable {
        require(quantity > 0, "Insufficient tokens to mint");
        _currentIndex = totalSupply();
        for(uint8 i = 0; i < quantity; i++){
            setTokenURI(_currentIndex + i);
            _ownerOf[_currentIndex+i] = msg.sender;
        }
        _safeMint(minter, quantity);
    }

    function burn(uint256 tokenId) external {
        require(_exists(tokenId), "TokenId doesn't exist");
        delete _ownerOf[tokenId];
        delete _tokenURIs[tokenId];
        _burn(tokenId);
    }

    function approve(address to, uint256 tokenId) public payable override 
    {
        require(msg.sender == ownerOf(tokenId), "Not a owner of token");
        _ownerOf[tokenId] = to;
    }

    function ownerOf(uint256 tokenId) public view override returns (address owner){
        return _ownerOf[tokenId];
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function base_URI() external view  returns (string memory) {
        return _baseTokenURI;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "TokenId doesn't exist");
        return _tokenURIs[tokenId];
    }
    
    // setting tokenURI by concatenating baseURI and tokenId
    function setTokenURI(uint256 tokenId) public {
        _tokenURI = bytes(_baseTokenURI).length != 0 ? string(abi.encodePacked(_baseTokenURI, _toString(tokenId),".json")) : '';
        _tokenURIs[tokenId] = _tokenURI;
    }
}