import React, {PropsWithChildren, useState} from 'react';
import {SessionContext} from './SessionContext';

export const SessionProvider = ({children}: PropsWithChildren) => {
	const [userId, setUserId] = useState<string | undefined>();

	const logOut = () => {
		setUserId(undefined);
	};

	const logIn = (newUserId: string) => setUserId(newUserId);

	return (
		<SessionContext.Provider
			value={{
				userId,
				logIn,
				logOut,
			}}>
			{children}
		</SessionContext.Provider>
	);
};
