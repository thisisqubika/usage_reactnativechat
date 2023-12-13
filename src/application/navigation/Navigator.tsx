import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';

export const Navigator: React.FC = () => {
	return (
		<NavigationContainer>
			<MainStack />
		</NavigationContainer>
	);
};
