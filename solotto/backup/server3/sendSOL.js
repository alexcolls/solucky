var web3 = require("@solana/web3.js");
// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const MASTER_WALLET = new Uint8Array([253,189,159,156,48,206,128,155,197,104,102,88,1,29,29,192,160,48,151,249,58,79,64,139,69,165,5,132,142,54,81,16,225,69,202,140,132,222,51,124,34,92,38,44,130,52,49,179,87,59,23,155,56,59,15,172,86,80,52,48,25,220,221,171]);

const TO_PUBKEY = '2TyAp92s7TEksnycmYY2Fk5i1j5anwFTqECyuFMVhomP';
const amount = 1000000000;

(async () => {
    // Connect to cluster
    var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    // Construct a `Keypair` from secret key
    var from = web3.Keypair.fromSecretKey(MASTER_WALLET);
    // Add transfer instruction to transaction
    var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: new web3.PublicKey(TO_PUBKEY),
            lamports: amount,
        })
    );
    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
})();