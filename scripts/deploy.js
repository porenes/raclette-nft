async function main() {
    // Grab the contract factory 
    const RacletteNFT = await ethers.getContractFactory("RacletteNFT");
    
    // Start deployment, returning a promise that resolves to a contract object
    const racletteNFT = await RacletteNFT.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", racletteNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });