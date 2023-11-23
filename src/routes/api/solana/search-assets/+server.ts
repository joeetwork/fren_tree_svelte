import { searchAssets } from "$lib/helius/search-assets.js";

import { HELIUS_KEY } from "$env/static/private";

import { json, error } from "@sveltejs/kit";

export async function POST({ url, request }) {
    try {
        const {
            ownerAddress = "",
            compressed = false,
            page = 1,
            limit = 1000,
        } = await request.json();

        const data = await searchAssets(
            {
                ownerAddress,
                compressed,
                page,
                limit,
            },
            HELIUS_KEY
        );

        return json({
            data,
        });
    } catch (err) {
        error(500, String(err));
    }
}
