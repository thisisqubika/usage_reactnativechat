import {createContext, useContext} from 'react';

export interface Session {
	logIn: (userId: string) => void;
	logOut: () => void;
	userId?: string;
}

const initialSession: Session = {
	logIn: async () => {},
	logOut: () => {},
};

export const SessionContext = createContext<Session>(initialSession);
export const useSessionContext = () => useContext(SessionContext);
