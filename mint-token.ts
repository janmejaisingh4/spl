import {
  Connection,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

import * as fs from "fs";

async function main() {

  // CONNECTION
  const connection = new Connection(
    clusterApiUrl("devnet"),
    "confirmed"
  );

  // LOAD EXISTING WALLET
  const secretKey = JSON.parse(
    fs.readFileSync(
      `${process.env.HOME}/.config/solana/id.json`,
      "utf-8"
    )
  );

  const payer = Keypair.fromSecretKey(
    Uint8Array.from(secretKey)
  );

  console.log(
    "Wallet:",
    payer.publicKey.toBase58()
  );

  // CREATE SPL TOKEN MINT
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    9
  );

  console.log(
    "Token Mint:",
    mint.toBase58()
  );

  // CREATE TOKEN ACCOUNT
  const tokenAccount =
    await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

  // MINT TOKEN
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer,
    1_000_000_000
  );

  console.log(
    "Minted 1 Token"
  );
}

main().catch(console.error);