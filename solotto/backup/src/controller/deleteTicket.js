

import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, AnchorProvider } from '@project-serum/anchor'
import idl from '../program/idl.json'
import { getTickets } from './getTickets'

const clusterUrl = "https://api.devnet.solana.com"
const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)

import { web3 } from '@project-serum/anchor'
let firstWinPrivKey = [28,176,254,138,107,190,130,6,158,136,148,224,14,135,68,107,120,104,7,176,195,65,1,4,134,232,232,74,73,115,114,4,9,206,50,19,217,30,20,113,180,184,172,39,80,3,23,61,50,29,91,166,234,133,41,117,30,61,1,241,114,114,118,1].slice(0,32);
let firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));


export const deleteTicket = async () => {
  console.log(firstWinWallet);
  const wallet = useAnchorWallet()
  const connection = new Connection(clusterUrl, commitment)
  const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }))
  const program = computed(() => new Program(idl, programID, provider.value))
  const tickets = await getTickets();
  console.log(tickets)
  const ticket = tickets[0]

  await program.value.rpc.deleteTickets({
      accounts: {
        ticket: ticket.publicKey,
        owner: ticket.publicKey,
      },
  })
};