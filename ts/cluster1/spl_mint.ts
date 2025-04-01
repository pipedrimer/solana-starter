import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const ata_account = new PublicKey("JDa2yB1fAvEcLS3TQ9zrdH2AuWCgRLZt4EpYCFjs55er")

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("9t28zwkL9HuS5c6k6rA6sdai3qbM5Cy4p78B5pgi79ML");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, ata_account )
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, 200000000 )
        console.log(`Your mint txid: ${mintTx}`);
    } 
    catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
