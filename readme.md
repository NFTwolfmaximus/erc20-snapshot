Testing PR 
This is a stripped down version of the snapshot tool created by https://github.com/chronos-ohm
# ERC20 Token Snapshot

This command-line utility creates a snapshot of any ERC20 token and writes that snapshot to local file in JSON/CSV format.

- Works without a local Ethereum node.
- Automatically resumes from the last loaded block.
- Tested to work with Infura.


## Configuration File / Prompt Parameters

1. Edit the `snapshot.config.json` file at the project root, with the following variables:

```json
{
  "provider": "YOUR-PROVIDER-URL",
  "contractAddress": "YOUR-CONTRACT-ADDRESS",
  "fromBlock": 13675914, //The Starting block as a number, notice no quotes 
  "toBlock": "latest", //Can specify the latest block with "latest"
  "writeToLocalFile": true,
  "format": "csv",
  "blocksPerBatch": 3000,
  "delay": 0,
  "checkIfContract": false
}
```
### provider

Enter your fully synced Ethereum node. Could be a local node or remote services like Infura.

### contractAddress

Address of your ERC20 token.

### fromBlock

The block height to scan from. To save time, enter the block number of the transaction your token was created on. Note: if a higher block number has already been downloaded, the scan will start at that block number instead.

### toBlock

The block height to end the scan at.

### writeToLocalFile

Writes addresses and balances to local JSON/CSV file.

### blocksPerBatch

The number of blocks to query per batch.

If you are using remote service like Infura, keep this number relative low (2000-5000) to avoid rate limits. If you are using a dedicated Ethereum node, you can increase this number to suit your needs.

### delay

The delay (in ms) between each request in the loop. Tweak this if you are experiencing rate limit from your provider.

### checkIfContract

Checks each address to determine whether it is a smart contract or an Ethereum wallet.

## How to Use Token Snapshot?

- Run `npm install` at the root of the project.
- Run `npm run start` at the root of the project.
