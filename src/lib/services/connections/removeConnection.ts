import { usersAccount } from '$lib/services/accounts/usersAccount';
import { SystemProgram } from '@solana/web3.js';
import { connectionAccount } from '$lib/services/accounts/connectionAccount';
import type { RemoveConnectionAccount } from '../../../types/instructions';

export const RemoveConnection = async ({
	anchor,
	wallet,
	toWallet,
	idx
}: RemoveConnectionAccount) => {
	if (!anchor.program) {
		return;
	}

	const fromUsersPda = usersAccount({ anchor, wallet });

	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const fromUser = await anchor.program?.account.userProfile.fetch(fromUsersPda);

	const connectionPda = connectionAccount({ anchor, wallet, idx: fromUser.count ?? 0 });

	const toUser = await anchor.program?.account.userProfile.fetch(toUsersPda);

	const toConnectionPda = connectionAccount({ anchor, wallet: toWallet, idx: toUser.count ?? 0 });

	try {
		await anchor.program.methods
			.removeConnection({ connectionId: idx })
			.accounts({
				fromAccount: fromUsersPda,
				toAccount: toUsersPda,
				fromConnectionAccount: connectionPda,
				toConnectionAccount: toConnectionPda,
				authority: wallet.publicKey,
				systemProgram: SystemProgram.programId
			})
			.rpc();
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
