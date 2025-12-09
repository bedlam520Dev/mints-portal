import type { ThirdwebContract } from 'thirdweb';
import { getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

import { client } from '@/app/client';
import type { DropContractConfig } from '@/config/contracts';

export const buildContractInstance = (
	config: DropContractConfig
): ThirdwebContract =>
	getContract({
		client,
		address: config.address,
		chain: defineChain(config.chainId),
	});
