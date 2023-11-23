<script>
	import Wallet from '$lib/components/wallet.svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import { AnchorConnectionProvider } from '@svelte-on-solana/wallet-adapter-anchor';
	import idl from '../idl/fren_tree.json';
	import { NETWORK } from '$lib/const';

	const network = clusterApiUrl(NETWORK);
</script>

<!-- <AnchorConnectionProvider {network} {idl} /> -->
<nav class="sticky left-0 top-0 flex w-full items-center justify-between bg-indigo-900 p-3">
	<h1 class="text-xl text-white">Fren Tree</h1>
	<div class="flex items-center">
		<Wallet />
	</div>
</nav>
<main class="mx-auto max-w-3xl py-10">
	<slot />
</main>

<style global>
	@import '../app.css';
</style>
