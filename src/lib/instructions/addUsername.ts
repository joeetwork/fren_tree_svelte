import { usernameAccount } from '$lib/accounts/usernameAccount';
import { usersAccount } from '$lib/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import type { AddUsername } from '../../types/instructions';

export const addUsername = async ({ anchor, wallet, username }: AddUsername) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const usernamePda = usernameAccount({ anchor, wallet, username });

	try {
		await anchor.program.methods
			.addUsername({ username })
			.accounts({
				authority: wallet.publicKey,
				userProfile: usersPda,
				systemProgram: SystemProgram.programId,
				uniqueUsername: usernamePda
			})
			.rpc();

		const test = await anchor.program?.account.uniqueUsername.fetch(usernamePda);

		console.log(test);
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
