<script lang="ts">
	import { getConnections } from '$lib/services/connections/getConnections';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let connections: Map<number, Record<string, unknown>>;

	const handleClick = async () => {
		connections = await getConnections({ anchor: $workSpace, wallet: $walletStore });
	};
</script>

<button on:click={handleClick}>get connections</button>
