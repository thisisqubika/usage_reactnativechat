import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {SessionProvider} from '@features/session/SessionProvider';
import {QueryProvider} from '../infrastructure/query';
import {Navigator} from './navigation';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<QueryProvider>
			<SessionProvider>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				<Navigator />
			</SessionProvider>
		</QueryProvider>
	);
};

export default App;
