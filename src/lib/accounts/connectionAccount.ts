import { PublicKey } from '@solana/web3.js';
import type { ConnectionAccount } from '../../types/instructions';

export const connectionAccount = ({ anchor, wallet, idx }: ConnectionAccount): PublicKey => {
	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('CONNECTION'), wallet.publicKey.toBuffer(), Buffer.from([idx ?? 0])],
		anchor.program.programId
	);

	return pda;
};
