import { client, getServerThirdwebClient } from '@/app/client';
import type { DropContractConfig } from '@/config/contracts';
import type { ThirdwebClient, ThirdwebContract } from 'thirdweb';
import { getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

export const buildContractInstance = (
	config: DropContractConfig,
	customClient?: ThirdwebClient
): ThirdwebContract =>
	getContract({
		client: customClient ?? client,
		address: config.address,
		chain: defineChain(config.chainId),
	});

export const buildServerContractInstance = (
	config: DropContractConfig
): ThirdwebContract => buildContractInstance(config, getServerThirdwebClient());
