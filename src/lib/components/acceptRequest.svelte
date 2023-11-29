<script lang="ts">
	import { getRequests } from '$lib/services/requests/getRequests';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let requests: Map<number, Record<string, unknown>>;

	const handleRequests = async () => {
		requests = await getRequests({ anchor: $workSpace, wallet: $walletStore });
	};

	// const acceptRequests = async () => {
	// 	const usersPda = usersAccount({ anchor: $workSpace, wallet: $walletStore });

	// 	const user = await $workSpace.program?.account.userProfile.fetch(usersPda);

	// 	if (user) {
	// 		for (let i = 0; i < (user.connections as number); i++) {
	// 			const connectionPda = await acceptRequest({
	// 				anchor: $workSpace,
	// 				wallet: $walletStore,
	// 				idx: i
	// 			});

	// 			const connection = await $workSpace.program?.account.connectionAccount.fetch(connectionPda);

	// 			connections.set(i, connection);
	// 		}
	// 	}
	// };
</script>

<button on:click={handleRequests}>Get requests</button>
