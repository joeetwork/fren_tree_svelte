<script>
	import { clusterApiUrl } from '@solana/web3.js';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { goto } from '$app/navigation';
	import {
		workSpace,
		WalletProvider,
		ConnectionProvider,
		WalletModal
	} from '@svelte-on-solana/wallet-adapter-ui';
	import {
		PhantomWalletAdapter,
		AlphaWalletAdapter,
		CloverWalletAdapter
	} from '@solana/wallet-adapter-wallets';
	const wallets = [new PhantomWalletAdapter(), new AlphaWalletAdapter(), new CloverWalletAdapter()];
	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('mainnet-beta');
	let showConnectWallet = false;
	const connectWallet = async (event) => {
		showConnectWallet = false;
		await $walletStore.select(event.detail);
		await $walletStore.connect();
	};
	const shortenAddress = (address) => `${address.slice(0, 4)}...${address.slice(-4)}`;
	const disconnect = () => {
		if (confirm('Disconnect wallet?')) {
			$walletStore.disconnect();
		}
	};
</script>

{#if $walletStore.connected}
	<button
		class="bg-card-gradient btn mr-2 flex items-center rounded-md bg-blue-500 p-2 px-2"
		on:click={disconnect}
	>
		<img
			class="mr-2 h-5"
			alt=""
			src="https://raw.githubusercontent.com/qudo-code/demo--tiplink/main/static/phantom.svg"
		/>
		{shortenAddress($walletStore.publicKey?.toBase58() || '')}
	</button>
{:else}
	<button
		class="btn-primary btn mr-2 rounded-full bg-blue-500 p-2 px-2"
		on:click={() => (showConnectWallet = true)}
	>
		Connect Wallet
	</button>
{/if}

<WalletProvider autoConnect={false} {localStorageKey} {wallets} />
<ConnectionProvider {network} />

{#if showConnectWallet}
	<WalletModal
		maxNumberOfWallets="6"
		on:connect={connectWallet}
		on:close={() => (showConnectWallet = false)}
	/>
{/if}
