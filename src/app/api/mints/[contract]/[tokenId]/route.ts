import { getContractConfig } from '@/config/contracts';
import { loadMintsForContract } from '@/lib/mints/loaders';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 300;

type RouteParams = {
	contract: string;
	tokenId: string;
};

export async function GET(
	_request: NextRequest,
	context: { params: Promise<RouteParams> }
) {
	try {
		const { contract, tokenId } = await context.params;
		if (!contract || !tokenId) {
			return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
		}

		const config = getContractConfig(contract);
		const numericTokenId = BigInt(tokenId);
		const [mint] = await loadMintsForContract(config, numericTokenId);
		if (!mint) {
			return NextResponse.json({ error: 'Mint not found' }, { status: 404 });
		}
		return NextResponse.json({ mint });
	} catch (error) {
		console.error('Failed to fetch mint details', error);
		return NextResponse.json(
			{ error: 'Unable to fetch mint details' },
			{ status: 500 }
		);
	}
}
