import { usersAccount } from '$lib/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import type { RequestAccount } from '../../types/instructions';
import { requestAccount } from '$lib/accounts/requestAccount';
import { connectionAccount } from '$lib/accounts/connectionAccount';

export const declineRequest = async ({ anchor, wallet, toWallet }: RequestAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromUsersPda = usersAccount({ anchor, wallet });

	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const requestPda = requestAccount({ anchor, wallet, toWallet });

	const fromUser = await anchor.program?.account.userProfile.fetch(fromUsersPda);

	const fromConnectionPda = connectionAccount({ anchor, wallet, idx: fromUser.count ?? 0 });

	try {
		await anchor.program.methods
			.declineRequest({ requestId: 0 })
			.accounts({
				fromAccount: fromUsersPda,
				toAccount: toUsersPda,
				authority: toWallet,
				systemProgram: SystemProgram.programId,
				requestAccount: requestPda,
				connectionAccount: fromConnectionPda
			})
			.rpc();
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
