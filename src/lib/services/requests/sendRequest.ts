import { usersAccount } from '$lib/services/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import { requestAccount } from '$lib/services/accounts/requestAccount';
import { connectionAccount } from '$lib/services/accounts/connectionAccount';
import type { RequestsAccount } from '../../../types/instructions';

export const sendRequest = async ({ anchor, wallet, toWallet, idx }: RequestsAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromUsersPda = usersAccount({ anchor, wallet });

	const fromUser = await anchor.program?.account.userProfile.fetch(fromUsersPda);

	const connectionPda = connectionAccount({ anchor, wallet, idx: fromUser.count });

	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const requestPda = requestAccount({ anchor, wallet: toWallet, idx });

	try {
		await anchor.program.methods
			.sendRequest({ to: toWallet })
			.accounts({
				fromAccount: fromUsersPda,
				toAccount: toUsersPda,
				authority: wallet.publicKey,
				systemProgram: SystemProgram.programId,
				requestAccount: requestPda,
				connectionAccount: connectionPda
			})
			.rpc();
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
