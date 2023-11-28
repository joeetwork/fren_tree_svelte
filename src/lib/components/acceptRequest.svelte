<script lang="ts">
	import { connectionAccount } from '$lib/accounts/connectionAccount';
	import { requestAccount } from '$lib/accounts/requestAccount';
	import { usersAccount } from '$lib/accounts/usersAccount';
	import { acceptRequest } from '$lib/instructions/acceptRequest';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let requests = new Map();

	const getRequests = async () => {
		const usersPda = usersAccount({ anchor: $workSpace, wallet: $walletStore });

		const user = await $workSpace.program?.account.userProfile.fetch(usersPda);

		if (user) {
			for (let i = 0; i < (user.requests as number); i++) {
				const requestPda = await requestAccount({
					anchor: $workSpace,
					wallet: $walletStore,
					idx: i
				});

				const request = await $workSpace.program?.account.requestAccount.fetch(requestPda);

				requests.set(i, request);
			}
		}

		console.log(requests.entries());
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

<button on:click={getRequests}>Get requests</button>
