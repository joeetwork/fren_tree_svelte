import { PublicKey } from '@solana/web3.js';
import type { BaseProps } from '../../types/instructions';

export const usersAccount = ({ anchor, wallet }: BaseProps): PublicKey => {
	const usersWallet = wallet.publicKey ?? wallet;

	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('USER'), usersWallet.toBuffer()],
		anchor.program.programId
	);

	return pda;
};
