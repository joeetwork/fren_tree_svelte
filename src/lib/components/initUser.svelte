<script lang="ts">
	import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	const usersWallet = Keypair.generate();

	const airdrop = async () => {
		const signature = await $workSpace.connection.requestAirdrop(
			usersWallet.publicKey,
			LAMPORTS_PER_SOL
		);

		await $workSpace.connection.confirmTransaction(signature);
	};

	if (!$workSpace.program) {
		return;
	}

	const [usersPda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('USER'), usersWallet.publicKey.toBuffer()],
		$workSpace.program?.programId
	);

	const params = { twitter: '', role: '' };

	async function createCounter() {
		try {
			await $workSpace.program?.methods
				.initializeUser(params)
				.accounts({
					authority: usersWallet.publicKey,
					userProfile: usersPda,
					systemProgram: SystemProgram.programId
				})
				.signers([usersWallet])
				.rpc();

		

            const test = await $workSpace.program?.account.userProfile.fetch(usersPda);

console.log(test);
		} catch (err) {
			console.log('Transaction error: ', err);
		}
	}
</script>
