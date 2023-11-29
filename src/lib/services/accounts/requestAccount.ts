import { PublicKey } from '@solana/web3.js';
import type { RequestsAccount } from '../../../types/instructions';

export const requestAccount = ({ anchor, wallet, idx }: RequestsAccount): PublicKey => {
	const usersWallet = wallet.publicKey ?? wallet;

	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('REQUEST'), usersWallet.toBuffer(), Buffer.from([idx ?? 0])],
		anchor.program.programId
	);

	return pda;
};
