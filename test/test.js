const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const mintRate = ethers.utils.parseEther("0.1");
async function deployTokenFixture() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const baseURI =
    "https://gateway.pinata.cloud/ipfs/QmbG41ygppxHxJKn3vxE6dZdsBTD7oifW1Twj8LFpFhufe/";
  const MyContract = await ethers.getContractFactory("MyNFTContract");

  const hardhatToken = await MyContract.deploy();

  await hardhatToken.deployed();

  return { hardhatToken, owner, addr1, addr2, baseURI };
}

describe("MyContract", function () {
  it("Should set the right name and symbol", async function () {
    const { hardhatToken } = await loadFixture(deployTokenFixture);
    expect(await hardhatToken.name()).to.equal("_NFTContract");
    expect(await hardhatToken.symbol()).to.equal("_NFT");
  });

  it("Should assign the total supply of NFTs to the minter", async () => {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should assign the total number of NFTs minted to the totalSupply", async () => {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    await hardhatToken.connect(owner).mint(owner.address, 10);
    expect(await hardhatToken.totalSupply()).to.equal(10);
  });

  it("Should return owner of a minted NFT", async () => {
    const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);
    await hardhatToken.connect(addr1).mint(addr1.address, 1);
    const tokenId = 0;
    expect(await hardhatToken.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Should reduce the total supply of NFTs after burning", async () => {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    await hardhatToken.connect(owner).mint(owner.address, 10);
    const tokenId = 0;
    await hardhatToken.connect(owner).burn(tokenId);
    expect(await hardhatToken.totalSupply()).to.equal(9);
  });

  it("Should remove the owner of a NFT after burning", async () => {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    await hardhatToken.connect(owner).mint(owner.address, 1);
    const tokenId = 0;
    await hardhatToken.connect(owner).burn(tokenId);
    const nullAddress = "0x0000000000000000000000000000000000000000";
    expect(await hardhatToken.ownerOf(tokenId)).to.equal(nullAddress);
  });

  it("Should not allow non-owners to set baseURI", async function () {
    const { hardhatToken, addr1, baseURI } = await loadFixture(
      deployTokenFixture
    );
    await expect(
      hardhatToken.connect(addr1).setBaseURI(baseURI)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should return the baseURI", async function () {
    const { hardhatToken, owner, baseURI } = await loadFixture(
      deployTokenFixture
    );
    await hardhatToken.connect(owner).setBaseURI(baseURI);
    expect(await hardhatToken.base_URI()).to.equal(baseURI);
  });
});
