import type { BaseProps } from '../../../types/instructions';
import { connectionAccount } from '../accounts/connectionAccount';
import { usersAccount } from '../accounts/usersAccount';

export const getConnections = async ({
	anchor,
	wallet
}: BaseProps): Promise<Map<number, Record<string, unknown>>> => {
	const connections = new Map();

	const usersPda = usersAccount({ anchor, wallet });

	const user = await anchor.program?.account.userProfile.fetch(usersPda);

	if (user) {
		for (let i = 0; i < (user.connections as number); i++) {
			const connectionPda = await connectionAccount({
				anchor,
				wallet,
				idx: i
			});

			const connection = await anchor.program?.account.connectionAccount.fetch(connectionPda);

			connections.set(i, connection);
		}
	}

	return connections;
};
