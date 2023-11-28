import { PublicKey } from '@solana/web3.js';
import type { RequestAccount } from '../../types/instructions';
import { usersAccount } from './usersAccount';

export const requestAccount = async ({
	anchor,
	wallet,
	toWallet
}: RequestAccount): Promise<PublicKey> => {
	const toUsersPda = usersAccount({ anchor, wallet: toWallet });

	const toUsersCount = await anchor.program.account.userProfile.fetch(toUsersPda);

	const [pda] = PublicKey.findProgramAddressSync(
		[
			new TextEncoder().encode('REQUEST'),
			toWallet.toBuffer(),
			Buffer.from([toUsersCount.requests])
		],
		anchor.program.programId
	);

	return pda;
};
