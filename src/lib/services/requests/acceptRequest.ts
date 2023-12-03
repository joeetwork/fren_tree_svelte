import { usersAccount } from '$lib/services/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import { requestAccount } from '$lib/services/accounts/requestAccount';
import { connectionAccount } from '$lib/services/accounts/connectionAccount';
import type { AcceptRequestsAccount } from '../../../types/instructions';

export const acceptRequest = async ({ anchor, wallet, from, requestId, connectionId }: AcceptRequestsAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromConnectionPda = connectionAccount({ anchor, wallet: from,  idx: connectionId });

	const toUsersPda = usersAccount({ anchor, wallet });

	const requestPda = requestAccount({ anchor, wallet, requestId });

	const toUser = await anchor.program?.account.userProfile.fetch(toUsersPda);

	const toConnectionPda = connectionAccount({ anchor, wallet, idx: toUser.count });

	try {
		await anchor.program.methods
			.acceptRequest({ requestId })
			.accounts({
				toAccount: toUsersPda,
				authority: wallet.publicKey,
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
