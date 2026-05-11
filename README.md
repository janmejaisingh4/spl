# Solana SPL Token and NFT Minting Project

A TypeScript project demonstrating how to create and mint SPL tokens and NFTs on the Solana blockchain using the Solana Web3.js library and Metaplex Core.

## Features

- **SPL Token Minting**: Create and mint custom SPL tokens with configurable decimals
- **NFT Creation**: Mint NFTs using Metaplex Core with metadata and attributes
- **Devnet Support**: Configured for Solana devnet testing
- **TypeScript**: Full TypeScript support for type safety

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Solana wallet with devnet SOL for transaction fees

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd spl
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Solana wallet:
   ```bash
   solana-keygen new --outfile ~/.config/solana/id.json
   ```

4. Fund your wallet with devnet SOL:
   ```bash
   solana airdrop 2 ~/.config/solana/id.json --url https://api.devnet.solana.com
   ```

## Usage

### Minting an SPL Token

Run the token minting script:

```bash
npx ts-node mint-token.ts
```

This will:
- Create a new SPL token mint
- Set up an associated token account
- Mint 1 token (with 9 decimals, so 1,000,000,000 base units)

### Creating an NFT

Run the NFT minting script:

```bash
npx ts-node mint-nft.ts
```

This will:
- Create a new NFT using Metaplex Core
- Add metadata from the provided URI
- Attach attributes plugin with custom properties

## Configuration

### Wallet Configuration

The scripts automatically load your wallet from `~/.config/solana/id.json`. Make sure this file exists and contains your keypair.

### Network Configuration

Both scripts are configured to use Solana devnet. To change to mainnet or testnet, modify the connection URLs in the respective files:

- `mint-token.ts`: Change `clusterApiUrl("devnet")` to `clusterApiUrl("mainnet-beta")`
- `mint-nft.ts`: Change `"https://api.devnet.solana.com"` to `"https://api.mainnet-beta.solana.com"`

### NFT Metadata

Update the `uri` variable in `mint-nft.ts` to point to your NFT metadata JSON file hosted on Arweave, IPFS, or another decentralized storage solution.

## Dependencies

- `@metaplex-foundation/mpl-core`: Metaplex Core program for NFT operations
- `@metaplex-foundation/umi`: Universal Metaplex Interface
- `@solana/spl-token`: Solana Program Library token utilities
- `@solana/web3.js`: Solana JavaScript API
- `bs58`: Base58 encoding/decoding

## Development

To modify the scripts:

1. Edit the TypeScript files (`mint-nft.ts`, `mint-token.ts`)
2. Run with `npx ts-node <filename>`

## Disclaimer

This project is for educational purposes. Always test thoroughly on devnet before deploying to mainnet. Be aware of transaction fees and ensure your wallet has sufficient SOL.</content>
<parameter name="filePath">/home/cyd3er/week-2/spl/README.md