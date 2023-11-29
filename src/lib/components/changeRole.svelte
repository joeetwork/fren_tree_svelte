<script lang="ts">
	import { changeRole } from '$lib/services/user/changeRole';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let role: string = '';

	const handleClick = async () => {
		await changeRole({
			anchor: $workSpace,
			wallet: $walletStore,
			role
		});
	};
</script>

<input type="text" bind:value={role} />

<button on:click={handleClick}>Change Role</button>
