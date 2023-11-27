<script lang="ts">
	import { addTopConnection } from '$lib/instructions/addTopConnection';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let connection = 0;

	let position = 0;

	let role = 'Degen';

	let params = { connection, position, role };

	const handleClick = async () => {
		await addTopConnection({ anchor: $workSpace, wallet: $walletStore, params });
	};
</script>
