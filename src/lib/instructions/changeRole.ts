import { usersAccount } from '$lib/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import type { ChangeRole } from '../../types/instructions';

export const changeRole = async ({ anchor, wallet, role }: ChangeRole) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	try {
		await anchor.program.methods
			.changeRole({ role })
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
