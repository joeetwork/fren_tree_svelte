<script lang="ts">
	import { removeTopConnection } from '$lib/services/connections/removeTopConnection';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let position = 0;

	let role = 'Degen';

	let params = { position, role };

	const handleClick = async () => {
		await removeTopConnection({ anchor: $workSpace, wallet: $walletStore, params });
	};
</script>
