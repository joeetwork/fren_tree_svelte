import type { PublicKey } from '@solana/web3.js';

export type BaseProps = {
	anchor: WorkSpace;
	wallet: any;
};

export type InitializeUser = BaseProps & {
	params: { twitter: string; role: string };
};

export type AddUsername = BaseProps & {
	username: string;
};

export type ChangeRole = BaseProps & {
	role: string;
};

export type AddTopConnection = BaseProps & {
	params: { connection: number; position: number; role: string };
};

export type RemoveTopConnection = BaseProps & {
	params: { position: number; role: string };
};

export type ConnectionAccount = BaseProps & {
	idx?: number;
};

export type RemoveConnectionAccount = BaseProps & {
	toWallet: PublicKey;
	idx: number;
};

export type AcceptRequestsAccount = BaseProps & {
	from?: PublicKey;
	requestId: number;
	connectionId: number;
};

export type SendRequestsAccount = BaseProps & {
	toWallet: PublicKey;
	idx: number;
};

export type RequestsDerivedAccount = BaseProps & {
	from?: PublicKey;
	requestId: number;
};

export type Requests = {
	authority: string
	from: string
	connectionNumber: number
	requestNumber: number
  }