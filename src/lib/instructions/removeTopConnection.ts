import { SystemProgram } from '@solana/web3.js';
import type { RemoveTopConnection } from '../../types/instructions';
import { topConnectionsAccount } from '$lib/accounts/topConnectionsAccount';
import { usersAccount } from '$lib/accounts/usersAccount';

export const removeTopConnection = async ({ anchor, wallet, params }: RemoveTopConnection) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const topConnectionsPda = topConnectionsAccount({ anchor, wallet });

	try {
		await anchor.program.methods
			.removeTopConnections(params)
			.accounts({
				userProfile: usersPda,
				authority: wallet.publicKey,
				systemProgram: SystemProgram.programId,
				topConnectionsAccount: topConnectionsPda
			})
			.rpc();

		const test = await anchor.program?.account.userProfile.fetch(topConnectionsPda);

		console.log(test);
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
