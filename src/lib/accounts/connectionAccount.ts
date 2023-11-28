import { PublicKey } from '@solana/web3.js';
import type { ConnectionAccount } from '../../types/instructions';

export const connectionAccount = ({ anchor, wallet, idx }: ConnectionAccount): PublicKey => {
	const usersWallet = wallet.publicKey ?? wallet;

	const [pda] = PublicKey.findProgramAddressSync(
		[new TextEncoder().encode('CONNECTION'), usersWallet.toBuffer(), Buffer.from([idx ?? 0])],
		anchor.program.programId
	);

	return pda;
};
