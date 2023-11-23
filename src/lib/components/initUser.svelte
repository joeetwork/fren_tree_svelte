<script lang="ts">
	import { PublicKey, SystemProgram } from '@solana/web3.js';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let usersPda: PublicKey;

	if ($workSpace.program) {
		const [pda] = PublicKey.findProgramAddressSync(
			[new TextEncoder().encode('USER'), $walletStore.publicKey.toBuffer()],
			$workSpace.program.programId
		);

		usersPda = pda;
	}

	const params = { twitter: '', role: '' };

	async function createUser() {
        console.log($walletStore);
        
		try {
			await $workSpace.program?.methods
				.initializeUser(params)
				.accounts({
					authority: $walletStore.publicKey,
					userProfile: usersPda,
					systemProgram: SystemProgram.programId
				})
				.signers([$walletStore.signTransaction])
				.rpc();

			const test = await $workSpace.program?.account.userProfile.fetch(usersPda);

			console.log(test);
		} catch (err) {
			console.log('Transaction error: ', err);
		}
	}
</script>

<button on:click={createUser}>Create user profile</button>
