import { searchAssets } from '$lib/services/helius/searchAssets.js';

import { HELIUS_KEY } from '$env/static/private';

import { json, error } from '@sveltejs/kit';

interface Params {
	url: string;
	request: Request;
}

export async function POST({ request }: Params) {
	try {
		const { ownerAddress = '', compressed = false, page = 1, limit = 1000 } = await request.json();

		const data = await searchAssets(
			{
				ownerAddress,
				compressed,
				page,
				limit
			},
			HELIUS_KEY
		);

		return json({
			data
		});
	} catch (err) {
		error(500, String(err));
	}
}
