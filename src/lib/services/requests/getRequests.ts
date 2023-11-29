import { usersAccount } from '$lib/services/accounts/usersAccount';
import { requestAccount } from '$lib/services/accounts/requestAccount';
import type { BaseProps } from '../../../types/instructions';

export const getRequests = async ({
	anchor,
	wallet
}: BaseProps): Promise<Map<number, Record<string, unknown>>> => {
	const requests = new Map();

	const usersPda = usersAccount({ anchor, wallet });

	const user = await anchor.program?.account.userProfile.fetch(usersPda);

	if (user) {
		for (let i = 0; i < (user.requests as number); i++) {
			const requestPda = await requestAccount({
				anchor,
				wallet,
				idx: i
			});

			const request = await anchor.program?.account.requestAccount.fetch(requestPda);

			requests.set(i, request);
		}
	}

	return requests;
};
