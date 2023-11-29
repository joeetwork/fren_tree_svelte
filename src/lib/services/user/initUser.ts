import { SystemProgram } from '@solana/web3.js';
import { usersAccount } from '$lib/services/accounts/usersAccount';
import { connectionAccount } from '$lib/services/accounts/connectionAccount';
import { topConnectionsAccount } from '$lib/services/accounts/topConnectionsAccount';
import type { InitializeUser } from '../../../types/instructions';

export const createUser = async ({ anchor, wallet, params }: InitializeUser) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const connectionPda = connectionAccount({ anchor, wallet });

	const topConnectionsPda = topConnectionsAccount({ anchor, wallet });

	{
		try {
			await anchor.program?.methods
				.initializeUser(params)
				.accounts({
					authority: wallet.publicKey,
					userProfile: usersPda,
					connectionAccount: connectionPda,
					topConnectionsAccount: topConnectionsPda,
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
