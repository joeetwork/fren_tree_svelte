import { SystemProgram } from '@solana/web3.js';
import type { InitializeUser } from '../../types/instructions';
import { usersAccount } from '$lib/accounts/usersAccount';
import { connectionAccount } from '$lib/accounts/connectionAccount';

export const createUser = async ({ anchor, wallet, params }: InitializeUser) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const connectionPda = connectionAccount({anchor, wallet})

	{
		try {
			await anchor.program?.methods
				.initializeUser(params)
				.accounts({
					authority: wallet.publicKey,
					userProfile: usersPda,
					connectionAccount: connectionPda,
					systemProgram: SystemProgram.programId
				})
				.rpc();

			const test = await anchor.program?.account.userProfile.fetch(usersPda);

			console.log(test);
		} catch (err) {
			console.log('Transaction error: ', err);
		}
	}
};
