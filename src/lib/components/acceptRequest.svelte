<script lang="ts">
	import { getRequests } from '$lib/services/requests/getRequests';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { acceptRequest } from '$lib/services/requests/acceptRequest';
	import type { Requests } from '../../types/instructions';
	import { PublicKey } from '@solana/web3.js';

	let requests: Requests[];

	let selectRequest: number;

	const handleRequests = async () => {
		
		requests = await getRequests({ anchor: $workSpace, wallet: $walletStore });

		console.log(
			requests.filter((request) => {
				if (JSON.stringify(request.authority) === JSON.stringify($walletStore.publicKey)) {
					return request;
				}
			})
		);
	};

	const handleRequestSelect = (request: number) => {
		selectRequest = request;
	};

	const handleAcceptRequest = async () => {
		const request = requests[selectRequest];
		if (request) {
			const fromWallet = new PublicKey(request.from);

			await acceptRequest({
				anchor: $workSpace,
				wallet: $walletStore,
				from: fromWallet,
				connectionId: request.connectionNumber,
				requestId: selectRequest
			});
		}
	};
</script>

<button on:click={handleRequests}>Get requests</button>

{#if requests?.length > 0}
	<div>Account to accept: {requests[selectRequest]?.from}</div>
{console.log(requests[selectRequest])}
	<button on:click={handleAcceptRequest}>Accept request</button>

	{#each requests as request, index}
		<button on:click={() => handleRequestSelect(index)}>
			{request.from}
		</button>
	{/each}
{/if}
