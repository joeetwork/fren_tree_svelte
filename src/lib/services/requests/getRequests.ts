import { usersAccount } from '$lib/services/accounts/usersAccount';
import { requestAccount } from '$lib/services/accounts/requestAccount';
import type { BaseProps, Requests } from '../../../types/instructions';

export const getRequests = async ({
	anchor,
	wallet
}: BaseProps): Promise<Requests[]> => {
	const requests = new Map();

	const usersPda = usersAccount({ anchor, wallet });

	const user = await anchor.program?.account.userProfile.fetch(usersPda);
console.log(user);

	if (user) {
		for (let i = 0; i < user.lastRequests; i++) {
			const requestPda = await requestAccount({
				anchor,
				wallet,
				requestId: i
			});
console.log(requestPda);

			const request = await anchor.program?.account.requestAccount.fetch(requestPda);

			if(request){
			requests.set(i, request)};
		}
	}
// console.log(anchor);

	// const requests = await anchor.program.account.requestAccount.all();
console.log(requests);

	return requests;
};
