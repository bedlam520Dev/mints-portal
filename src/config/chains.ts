import {
	abstract,
	abstractTestnet,
	arbitrum,
	arbitrumSepolia,
	avalanche,
	avalancheFuji,
	base,
	baseSepolia,
	blast,
	blastSepolia,
	bsc,
	bscTestnet,
	celo,
	celoSepoliaTestnet,
	degen,
	ethereum,
	etherlink,
	etherlinkTestnet,
	gnosis,
	gnosisChiadoTestnet,
	linea,
	lineaSepolia,
	mode,
	modeTestnet,
	monad,
	monadTestnet,
	optimism,
	optimismSepolia,
	palm,
	palmTestnet,
	polygon,
	polygonAmoy,
	polygonZkEvm,
	polygonZkEvmTestnet,
	rari,
	rariTestnet,
	scroll,
	scrollSepoliaTestnet,
	sepolia,
	soneiumMinato,
	treasure,
	treasureTopaz,
	xai,
	xaiSepolia,
	zkSync,
	zkSyncSepolia,
	zora,
	zoraSepolia,
} from 'thirdweb/chains';
import type { Chain } from 'thirdweb/chains';

const getAlchemyRpcUrl = (chainId: number): string | undefined => {
	const alchemyKey = process.env.NEXT_ALCHEMY_API_KEY;
	if (!alchemyKey) return undefined;

	const alchemyNetworks: Record<number, string> = {
		1: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`,
		11155111: `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
		137: `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`,
		80002: `https://polygon-amoy.g.alchemy.com/v2/${alchemyKey}`,
		10: `https://opt-mainnet.g.alchemy.com/v2/${alchemyKey}`,
		11155420: `https://opt-sepolia.g.alchemy.com/v2/${alchemyKey}`,
		42161: `https://arb-mainnet.g.alchemy.com/v2/${alchemyKey}`,
		421614: `https://arb-sepolia.g.alchemy.com/v2/${alchemyKey}`,
		8453: `https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`,
		84532: `https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`,
	};

	return alchemyNetworks[chainId];
};

const withAlchemyRpc = (chain: Chain): Chain => {
	const alchemyRpc = getAlchemyRpcUrl(chain.id);
	if (!alchemyRpc) return chain;

	return {
		...chain,
		rpc: alchemyRpc,
	};
};

const coreChains: Chain[] = [
	abstract,
	abstractTestnet,
	arbitrum,
	arbitrumSepolia,
	avalanche,
	avalancheFuji,
	base,
	baseSepolia,
	bsc,
	bscTestnet,
	celo,
	celoSepoliaTestnet,
	ethereum,
	sepolia,
	gnosis,
	gnosisChiadoTestnet,
	linea,
	lineaSepolia,
	monad,
	monadTestnet,
	optimism,
	optimismSepolia,
	palm,
	palmTestnet,
	polygon,
	polygonAmoy,
	polygonZkEvm,
	polygonZkEvmTestnet,
	rari,
	rariTestnet,
	scroll,
	scrollSepoliaTestnet,
	zkSync,
	zkSyncSepolia,
];

const superchainMainnets: Chain[] = [
	base,
	etherlink,
	optimism,
	zora,
	mode,
	degen,
	treasure,
	xai,
	blast,
];

const superchainTestnets: Chain[] = [
	baseSepolia,
	etherlinkTestnet,
	optimismSepolia,
	zoraSepolia,
	modeTestnet,
	soneiumMinato,
	treasureTopaz,
	xaiSepolia,
	blastSepolia,
];

export const superchainNetworks = [...superchainMainnets, ...superchainTestnets];

export const supportedChains: Chain[] = [...coreChains, ...superchainNetworks].map(
	withAlchemyRpc
);

const defaultChainId = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) || 8453;
const baseChain = defaultChainId === 84532 ? baseSepolia : base;
export const primaryChain: Chain = withAlchemyRpc(baseChain);
