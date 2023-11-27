<script lang="ts">
	import { upgradeUser } from '$lib/instructions/upgradeUser';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	const handleClick = async () => {
		await upgradeUser({ anchor: $workSpace, wallet: $walletStore });
	};
</script>

<button on:click={handleClick}>Upgrade Account</button>
