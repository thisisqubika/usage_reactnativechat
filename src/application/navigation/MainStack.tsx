import {useSessionContext} from '@features/session/SessionContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Chat} from './screens/Chat/Chat';
import {ChatsList} from './screens/ChatsList/ChatsList';
import {Home} from './screens/Home/Home';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {
	const {userId} = useSessionContext();
	return (
		<Stack.Navigator>
			{userId ? (
				<>
					<Stack.Screen name="ChatsList" component={ChatsList} />
					<Stack.Screen name="Chat" component={Chat} />
				</>
			) : (
				<Stack.Screen name="Home" component={Home} />
			)}
		</Stack.Navigator>
	);
};
