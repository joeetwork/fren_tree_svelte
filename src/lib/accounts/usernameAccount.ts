import { PublicKey } from '@solana/web3.js';
import type { AddUsername } from '../../types/instructions';

export const usernameAccount = ({ anchor, username }: AddUsername): PublicKey => {
	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('USERNAME'), new TextEncoder().encode(username)],
		anchor.program.programId
	);

	return pda;
};
