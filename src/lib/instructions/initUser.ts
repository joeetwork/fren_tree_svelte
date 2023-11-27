import { PublicKey, SystemProgram } from '@solana/web3.js';
import type { InitializeUser } from '../../types/instructions';

export const createUser = async ({ anchor, wallet, params }: InitializeUser) => {
	console.log(anchor);

	if (!anchor.program) {
		return;
	}

	const [usersPda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('USER'), wallet.publicKey.toBuffer()],
		anchor.program.programId
	);

	{
		try {
			await anchor.program?.methods
				.initializeUser(params)
				.accounts({
					authority: wallet.publicKey,
					userProfile: usersPda,
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
