import { createThirdwebClient, Engine, getContract } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { claimTo } from 'thirdweb/extensions/erc1155';

// Create a thirdweb client
const client = createThirdwebClient({
	secretKey: process.env.THIRDWEB_SECRET_KEY as string,
});

// Create a server wallet
const serverWallet = Engine.serverWallet({
	client,
	address: process.env.NEXT_PUBLIC_SERVER_WALLET_ADDRESS as string,
});

// Prepare the transaction
const transaction = claimTo({
	contract: getContract({
		client,
		address: '0x767fFc681173fCa3D8532a2F2690a672A2C6af44', // Address of the ERC1155 token contract
		chain: base, // Chain of the ERC1155 token contract
	}),
	to: '0x...', // The address of the user to mint to
	tokenId: 0n, // The token ID of the NFT to mint
	quantity: 1n, // The quantity of NFTs to mint
});

// Enqueue the transaction via Engine
const { transactionId } = await serverWallet.enqueueTransaction({
	transaction,
});

// Get the execution status of the transaction at any point in time
const executionResult = await Engine.getTransactionStatus({
	client,
	transactionId,
});

// Utility function to poll for the transaction to be submitted onchain
const txHash = await Engine.waitForTransactionHash({
	client,
	transactionId,
});
console.log('Transaction hash:', txHash);
