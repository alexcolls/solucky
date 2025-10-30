import { web3 } from '@project-serum/anchor'
import { Ticket } from '@/models'
import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, AnchorProvider } from '@project-serum/anchor'
import idl from '../program/idl.json'


const clusterUrl = "https://api.devnet.solana.com"
const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)


export const sendTicket = async (number, country) => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterUrl, commitment)
    const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }))
    const program = computed(() => new Program(idl, programID, provider.value))

    const ticket = web3.Keypair.generate()

    await program.value.rpc.sendTicket(number, country, {
        accounts: {
          ticket: ticket.publicKey,
            owner: wallet.value.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [ticket]
    })

    const ticketAccount = await program.value.account.ticket.fetch(ticket.publicKey)
    return new Ticket(ticket.publicKey, ticketAccount)
}