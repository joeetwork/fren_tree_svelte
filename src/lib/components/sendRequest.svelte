<script lang="ts">
	import { usersAccount } from '$lib/accounts/usersAccount';
	import { sendRequest } from '$lib/services/requests/sendRequest';
	import { PublicKey } from '@solana/web3.js';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let address = 'F17gXajNLmVdMXtCPVpJ8enhwoxtscmDf7fLoJE8vUgw';

	const handleClick = async () => {
		const walletAddress = new PublicKey(address);

		const usersPda = usersAccount({ anchor: $workSpace, wallet: walletAddress });

		const user = await $workSpace.program?.account.userProfile.fetch(usersPda);

		await sendRequest({
			anchor: $workSpace,
			wallet: $walletStore,
			toWallet: walletAddress,
			idx: (user?.requests as number) ?? 0
		});
	};
</script>

<input type="text" bind:value={address} />

<button on:click={handleClick}>Send Request</button>
