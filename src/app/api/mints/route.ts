import { NextRequest, NextResponse } from 'next/server';

import { dropContracts, getContractConfig } from '@/config/contracts';
import { loadMintsForContract } from '@/lib/mints/loaders';

export const revalidate = 30;

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const contractSlug = searchParams.get('contract');
		const configs = contractSlug
			? [getContractConfig(contractSlug)]
			: dropContracts;

		const results = await Promise.all(
			configs.map((config) => loadMintsForContract(config))
		);
		const mints = results.flat();
		return NextResponse.json({ mints });
	} catch (error) {
		console.error('Failed to fetch mint catalog', error);
		return NextResponse.json(
			{ error: 'Unable to fetch mint data' },
			{ status: 500 }
		);
	}
}
