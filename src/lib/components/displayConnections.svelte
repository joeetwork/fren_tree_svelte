<script lang="ts">
	import { connectionAccount } from '$lib/services/accounts/connectionAccount';
	import { usersAccount } from '$lib/services/accounts/usersAccount';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let connections = new Map();

	const getConnections = async () => {
		const usersPda = usersAccount({ anchor: $workSpace, wallet: $walletStore });

		const user = await $workSpace.program?.account.userProfile.fetch(usersPda);

		if (user) {
			for (let i = 0; i < (user.connections as number); i++) {
				const connectionPda = await connectionAccount({
					anchor: $workSpace,
					wallet: $walletStore,
					idx: i
				});

				const connection = await $workSpace.program?.account.connectionAccount.fetch(connectionPda);

				connections.set(i, connection);
			}
		}

		console.log(connections.entries());
	};
</script>

<button on:click={getConnections}>get connections</button>
