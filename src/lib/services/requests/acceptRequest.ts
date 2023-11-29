import { usersAccount } from '$lib/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import { requestAccount } from '$lib/accounts/requestAccount';
import { connectionAccount } from '$lib/accounts/connectionAccount';
import type { RequestsAccount } from '../../../types/instructions';

export const acceptRequest = async ({ anchor, wallet, toWallet, idx }: RequestsAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromUsersPda = usersAccount({ anchor, wallet });

	const fromUser = await anchor.program?.account.userProfile.fetch(fromUsersPda);

	const fromConnectionPda = connectionAccount({ anchor, wallet, idx: fromUser.count });

	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const requestPda = requestAccount({ anchor, wallet: toWallet, idx });

	const toUser = await anchor.program?.account.userProfile.fetch(toUsersPda);

	const toConnectionPda = connectionAccount({ anchor, wallet: toWallet, idx: toUser.count });

	try {
		await anchor.program.methods
			.acceptRequest({ requestId: idx })
			.accounts({
				toAccount: toUsersPda,
				authority: toWallet,
				systemProgram: SystemProgram.programId,
				requestAccount: requestPda,
				connectionAccount: fromConnectionPda,
				newConnectionAccount: toConnectionPda
			})
			.rpc();
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};