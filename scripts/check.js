const {
  ethers
} = require("hardhat");
require("dotenv").config();

const config = require("../config/index");

const subProvider = new ethers.providers.JsonRpcProvider(config.mantle.url);
const subDeployer = new ethers.Wallet(process.env.PRIVATE_KEY, subProvider);

const mainProvider = new ethers.providers.JsonRpcProvider(config.polygon.url + process.env.INFURA_KEY);
const mainDeployer = new ethers.Wallet(process.env.PRIVATE_KEY, mainProvider);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const subBridgeMookup = await ethers.getContractAt("IBridgeMookup", config.mantle.BridgeMookup, subDeployer);
  const mainBridgeMookup = await ethers.getContractAt("IBridgeMookup", config.polygon.BridgeMookup, mainDeployer);
  
  while (true) {
    // const subGasPrice = (await mainProvider.getFeeData()).gasPrice;
    const mainGasPrice = (await mainProvider.getFeeData()).gasPrice.mul(2);

    const MAIN_GAS_PRICE = {
      gasPrice: mainGasPrice,
      gasLimit: "3000000",
    }

    const currentTransferId = await subBridgeMookup.currentTransferId();
    const processedId = await subBridgeMookup.processedId();

    console.log(currentTransferId)
    console.log(processedId)

    for (let i = processedId.add(1); i <= currentTransferId; i++) {
      const transferInfo = await subBridgeMookup.transferInfos(i);

      tx = await mainBridgeMookup.connect(mainDeployer).receiveTokens(
        transferInfo.targetToken,
        transferInfo.recipient,
        transferInfo.amount,
        MAIN_GAS_PRICE
      );
      await tx.wait();
      console.log("receiveTokens hash:", tx.hash);
    }

    if (currentTransferId.sub(processedId) != 0) {
      tx = await subBridgeMookup.connect(subDeployer).processTransfer(currentTransferId);
      await tx.wait();
      console.log("processTransfer hash:", tx.hash);
    }

    await sleep(60000);
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});