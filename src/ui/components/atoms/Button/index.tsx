import React from 'react';
import {TouchableOpacity, Text, ViewStyle} from 'react-native';

interface ButtonProps {
	title: string;
	onPress: () => void;
	style?: ViewStyle;
}

export const Button = (props: ButtonProps) => {
	return (
		<TouchableOpacity style={props.style} onPress={props.onPress}>
			<Text>{props.title}</Text>
		</TouchableOpacity>
	);
};
