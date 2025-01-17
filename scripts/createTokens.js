const ForgeToken = artifacts.require("ForgeToken");

// used to test with ganache
// truffle exec scripts/createTokens.js

module.exports = async (callback) => {
  try {
    const accounts = await web3.eth.getAccounts();

    const ZUT_ADDRESS = "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550";
    const IPFS_HASH = "QmYBzDTi64be4q8grwmQNNaWRgN8YeHU1w5MyoHEDjcZKk";
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const forge = await ForgeToken.at(
      "0xe982E462b094850F12AF94d21D470e21bE9D0E9C"
    );

    console.log(`Buying NFTs...`);
    await forge.buyWithETH(
      5,
      ZUT_ADDRESS,
      web3.utils.toWei("100"),
      0,
      IPFS_HASH,
      { from: accounts[0], value: web3.utils.toWei("0.1") }
    );
    const balance = await forge.balanceOf(accounts[0], 0);
    console.log(`Done! New Balance: ${String(balance)} NFT id #0`);

    await forge.buyWithETH(
      5,
      ZERO_ADDRESS,
      0,
      Math.floor(Date.now() / 1000) + 60,
      IPFS_HASH,
      { from: accounts[0], value: web3.utils.toWei("0.1") }
    );
    const balance2 = await forge.balanceOf(accounts[0], 1);
    console.log(`Done! New Balance: ${String(balance2)} NFT id #1`);

    console.log(`Transfering 1 NFT of id #0 to ${accounts[1]} `);
    await forge.safeTransferFrom(accounts[0], accounts[1], 0, 1, "0x");
    console.log(`Transfering 1 NFT of id #0 to ${accounts[2]} `);
    await forge.safeTransferFrom(accounts[0], accounts[2], 0, 1, "0x");

    console.log(`Transfering 1 NFT of id #1 to ${accounts[1]} `);
    await forge.safeTransferFrom(accounts[0], accounts[1], 1, 1, "0x");
    console.log(`Transfering 1 NFT of id #1 to ${accounts[2]} `);
    await forge.safeTransferFrom(accounts[0], accounts[2], 1, 1, "0x");

    callback();
  } catch (e) {
    callback(e);
  }
};
