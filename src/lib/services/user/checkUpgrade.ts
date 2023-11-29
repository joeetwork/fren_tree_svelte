import { usersAccount } from '$lib/services/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import type { BaseProps } from '../../../types/instructions';

export const checkUpgrade = async ({ anchor, wallet }: BaseProps) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	try {
		await anchor.program.methods
			.checkUpgrade()
			.accounts({
				authority: wallet.publicKey,
				userProfile: usersPda,
				systemProgram: SystemProgram.programId
			})
			.rpc();

		const test = await anchor.program?.account.userProfile.fetch(usersPda);

		console.log(test);
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
