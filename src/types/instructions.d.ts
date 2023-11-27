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
	params: { connection: number, position: number, role: string  };
};