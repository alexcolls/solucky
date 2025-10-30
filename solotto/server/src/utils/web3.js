const web3 =  require('@solana/web3.js');
const coinTicker = require('coin-ticker');

async function potBalance () {
  try {
    const masterPubKey = new web3.PublicKey('GANTRxDjP5BoUExWqVLAC9yVhC29dThviuqNmMDdSEF4');
    const connection = new web3.Connection('https://api.devnet.solana.com', 'processed');
    const potSOL = Math.floor(await connection.getBalance(masterPubKey)/1000000000);
    coinTicker('bitstamp', 'SOL_USD').then( (price) => { 
      const potUSD = Math.floor(potSOL*price.last)
      return { potSOL, potUSD };
    });
  } catch (error) {
    console.log(error)
    return error;
  }
}

module.exports = {
  potBalance
}