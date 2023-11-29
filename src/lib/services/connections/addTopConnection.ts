import { SystemProgram } from '@solana/web3.js';
import { topConnectionsAccount } from '$lib/services/accounts/topConnectionsAccount';
import { usersAccount } from '$lib/services/accounts/usersAccount';
import type { AddTopConnection } from '../../../types/instructions';

export const addTopConnection = async ({ anchor, wallet, params }: AddTopConnection) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const topConnectionsPda = topConnectionsAccount({ anchor, wallet });

	try {
		await anchor.program.methods
			.addTopConnections({ params })
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
