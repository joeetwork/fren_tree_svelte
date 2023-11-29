import { HELIUS_API_URL } from '$lib/const';
import type { AssetParams, Assets } from '../../../types/searchAssets';

export const searchAssets = async (params: AssetParams, apiKey: string) => {
	const response = await fetch(`${HELIUS_API_URL}?api-key=${apiKey}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 'my-id',
			method: 'searchAssets',
			params
		})
	});

	const { result } = (await response.json()) as Assets;

	return result;
};
