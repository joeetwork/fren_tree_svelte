import { usersAccount } from '$lib/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import { requestAccount } from '$lib/accounts/requestAccount';
import { connectionAccount } from '$lib/accounts/connectionAccount';
import type { RequestsAccount } from '../../../types/instructions';

export const declineRequest = async ({ anchor, wallet, toWallet, idx }: RequestsAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromUsersPda = usersAccount({ anchor, wallet });

	const fromUser = await anchor.program?.account.userProfile.fetch(fromUsersPda);

	const fromConnectionPda = connectionAccount({ anchor, wallet, idx: fromUser.count });

	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const requestPda = requestAccount({ anchor, wallet: toWallet, idx });

	try {
		await anchor.program.methods
			.declineRequest({ requestId: idx })
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