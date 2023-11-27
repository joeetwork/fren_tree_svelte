import { SystemProgram } from '@solana/web3.js';
import type { BaseProps } from '../../types/instructions';
import { topConnectionsAccount } from '$lib/accounts/topConnectionsAccount';

export const initTopConnection = async ({ anchor, wallet }: BaseProps) => {
	if (!anchor.program) {
		return;
	}

	const topConnectionsPda = topConnectionsAccount({ anchor, wallet });

	try {
		await anchor.program.methods
			.initializeTopConnections()
			.accounts({
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
