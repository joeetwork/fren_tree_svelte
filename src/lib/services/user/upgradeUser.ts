import { usersAccount } from '$lib/accounts/usersAccount';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { OWNERSWALLET } from '$lib/const';
import type { BaseProps } from '../../../types/instructions';

export const upgradeUser = async ({ anchor, wallet }: BaseProps) => {
	if (!anchor.program) {
		return;
	}

	const usersPda = usersAccount({ anchor, wallet });

	const ownersWallet = new PublicKey(OWNERSWALLET);

	try {
		await anchor.program.methods
			.upgradeUser()
			.accounts({
				authority: wallet.publicKey,
				userProfile: usersPda,
				systemProgram: SystemProgram.programId,
				to: ownersWallet
			})
			.rpc();

		const test = await anchor.program?.account.userProfile.fetch(usersPda);

		console.log(test);
	} catch (err) {
		console.log('Transaction error: ', err);
	}
};
