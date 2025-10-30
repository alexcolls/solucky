
import { Ticket } from './models'
import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, AnchorProvider } from '@project-serum/anchor'
import idl from '../program/idl.json'


const clusterUrl = "https://api.devnet.solana.com"
const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)

export const getTickets = async (filters = []) => {
  const wallet = useAnchorWallet()
  const connection = new Connection(clusterUrl, commitment)
  const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }))
   const program = computed(() => new Program(idl, programID, provider.value))

  const tickets = await program.value.account.ticket.all(filters);
  return tickets.map(ticket => new Ticket(ticket.publicKey, ticket.account))
}