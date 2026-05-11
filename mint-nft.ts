import fs from "fs";

import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
} from "@metaplex-foundation/umi";

import { createUmi } from
  "@metaplex-foundation/umi-bundle-defaults";

import {
  mplCore,
  create,
  addPlugin,
} from "@metaplex-foundation/mpl-core";

async function main() {

  // CREATE UMI
  const umi = createUmi(
    "https://api.devnet.solana.com"
  ).use(mplCore());

  // LOAD WALLET
  const secretKey = JSON.parse(
    fs.readFileSync(
      `${process.env.HOME}/.config/solana/id.json`,
      "utf-8"
    )
  );

  // CREATE KEYPAIR
  const keypair =
    umi.eddsa.createKeypairFromSecretKey(
      new Uint8Array(secretKey)
    );

  // CREATE SIGNER
  const signer =
    createSignerFromKeypair(
      umi,
      keypair
    );

  umi.use(signerIdentity(signer));

  console.log(
    "Wallet:",
    signer.publicKey
  );

  // NFT ASSET
  const asset = generateSigner(umi);

  // METADATA URI
  const uri =
    "https://arweave.net/example-metadata.json";

  // CREATE NFT
  await create(umi, {
    asset,
    name: "Jai Core NFT",
    uri,
  }).sendAndConfirm(umi);

  console.log(
    "NFT Minted:",
    asset.publicKey
  );

  // ADD ATTRIBUTES PLUGIN
  await addPlugin(umi, {
    asset: asset.publicKey,

    plugin: {
      type: "Attributes",

      attributeList: [
        {
          key: "Level",
          value: "Legendary",
        },
        {
          key: "Origin",
          value: "Kanpur",
        },
      ],
    },
  }).sendAndConfirm(umi);

  console.log(
    "Attributes Plugin Added"
  );
}

main().catch(async (error) => {

  console.error(error);

  if (error.getLogs) {
    const logs = await error.getLogs();
    console.log(logs);
  }

});