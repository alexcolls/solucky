//import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, Transaction } from '@solana/web3.js'
//import { Program, AnchorProvider } from '@project-serum/anchor'
//import idl from './idl.json'
import { getTickets } from './getTickets'

import { web3 } from '@project-serum/anchor'

import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

const clusterUrl = "https://api.devnet.solana.com"
//const preflightCommitment = 'processed'
const commitment = 'processed'
//const programID = new PublicKey(idl.metadata.address)

let firstWinPrivKey = [28,176,254,138,107,190,130,6,158,136,148,224,14,135,68,107,120,104,7,176,195,65,1,4,134,232,232,74,73,115,114,4,9,206,50,19,217,30,20,113,180,184,172,39,80,3,23,61,50,29,91,166,234,133,41,117,30,61,1,241,114,114,118,1].slice(0,32);

let firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));


export const closeAccount = async () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterUrl, commitment)
    //const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }))
    console.log(firstWinWallet)
    console.log(wallet.value)
    //const program = computed(() => new Program(idl, programID, provider.value))

    const tickets = await getTickets()

    console.log(tickets)


    let tx = new Transaction();
    tx.add(
      Token.createCloseAccountInstruction(
        TOKEN_PROGRAM_ID, // fixed
        tickets[0].publicKey, // to be closed token account
        tickets[0].owner, // rent's destination
        tickets[0].owner, // token account authority
        [] // multisig
      )
    );
    tx.feePayer = wallet.value.publicKey;

    console.log(`txhash: ${await connection.sendTransaction(tx, [tickets[0], tx.feePayer])}`);

    //closers.forEach(async closer => await program.value.rpc.close(closer));
    // await program.value.rpc.forceDefund({accounts: {
    //   account: tickets[0].publicKey,
    //   destination: tickets[0].owner    
    // },
    // signer: [firstWinWallet]},
    // )

    // console.log(tickets)
    // await program.value.rpc.close({accounts: {
    //   account: tickets[0].publicKey,
    //   destination: tickets[0].owner    
    // },
    // signer: [firstWinWallet]},
    // )
    // return true
}
