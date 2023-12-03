import { PublicKey } from '@solana/web3.js';
import type { RequestsDerivedAccount } from '../../../types/instructions';

export const requestAccount = ({ anchor, wallet, requestId }: RequestsDerivedAccount): PublicKey => {
	const usersWallet = wallet.publicKey ?? wallet;

	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('REQUEST'), usersWallet.toBuffer(), Buffer.from([requestId ?? 0])],
		anchor.program.programId
	);

	return pda;
};
