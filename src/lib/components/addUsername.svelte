<script lang="ts">
	import { addUsername } from '$lib/instructions/addUsername';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let username: string = '';

	const handleClick = async () => {
		await addUsername({
			anchor: $workSpace,
			wallet: $walletStore,
			username
		});
	};
</script>

<input type="text" bind:value={username} />

<button on:click={handleClick}>Add</button>
