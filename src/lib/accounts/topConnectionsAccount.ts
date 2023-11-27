import { PublicKey } from '@solana/web3.js';
import type { BaseProps } from '../../types/instructions';

export const topConnectionsAccount = ({ anchor, wallet }: BaseProps): PublicKey => {
	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('TOP'), wallet.publicKey.toBuffer()],
		anchor.program.programId
	);

	return pda;
};
