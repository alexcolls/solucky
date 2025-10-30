require('dotenv').config();

const web3 = require("@solana/web3.js");
const MASTER_WALLET = new Uint8Array(process.env.MASTER_KEY.split(',').map( (e) => Number(e)));
const TO_PUBKEY = '2TyAp92s7TEksnycmYY2Fk5i1j5anwFTqECyuFMVhomP';
const AMOUNT = 10000000000;

async  function sendSOL() {
	// Connect to cluster
	const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
	// Construct a `Keypair` from secret key
	const from = web3.Keypair.fromSecretKey(MASTER_WALLET);
	// Add transfer instruction to transaction
	const transaction = new web3.Transaction().add(
		web3.SystemProgram.transfer({
			fromPubkey: from.publicKey,
			toPubkey: new web3.PublicKey(TO_PUBKEY),
			lamports: AMOUNT,
		})
	);
	// Sign transaction, broadcast, and confirm
	const signature = await web3.sendAndConfirmTransaction(
		connection,
		transaction,
		[from]
	);
	console.log("SIGNATURE", signature);
	console.log("SUCCESS");
}

module.exports = {
	sendSOL
}