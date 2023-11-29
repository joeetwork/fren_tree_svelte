<script lang="ts">
	import { createUser } from '$lib/services/user/initUser';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	const handleClick = async () => {
		await createUser({
			anchor: $workSpace,
			wallet: $walletStore,
			params: { twitter: '', role: '' }
		});
	};
</script>

<button on:click={handleClick}> test </button>
