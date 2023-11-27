import { PublicKey, SystemProgram } from '@solana/web3.js';
import type { WorkSpace } from '@svelte-on-solana/wallet-adapter-anchor';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import type { Writable } from 'svelte/store';

interface Params {
	anchor: Writable<WorkSpace>;
	wallet: any;
}

export const createUser = async ({anchor, wallet}: Params) => {
	let usersPda: PublicKey;

	if ($anchor.program) {
		const [pda] = PublicKey.findProgramAddressSync(
			[new TextEncoder().encode('USER'), $anchor.publicKey.toBuffer()],
			$anchor.program.programId
		);

		usersPda = pda;
	}

	const params = { twitter: '', role: '' };

	{
		try {
			await $anchor.program?.methods
				.initializeUser(params)
				.accounts({
					authority: $wallet.publicKey,
					userProfile: usersPda,
					systemProgram: SystemProgram.programId
				})
				.rpc();

			const test = await $anchor.program?.account.userProfile.fetch(usersPda);

			console.log(test);
		} catch (err) {
			console.log('Transaction error: ', err);
		}
	}
};
