require('dotenv').config();
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/RacletteNFT.sol/RacletteNFT.json"); 
console.log(JSON.stringify(contract.abi));
const contractAddress = "0x902288bc5981895fdde1081ecd1c25a241f858d0";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}
mintNFT("https://gateway.pinata.cloud/ipfs/QmcDeXPNHv6pwQX7cuTjk9KmpXPy6GCffLZmBesxeaJvh6")