import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	separator: {
		height: 24,
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
	},
});

interface InputAndTitleProps {
	title: string;
	onChange: (_: string) => void;
	currentValue: string;
	protected?: boolean;
}

export const InputAndTitle = (props: InputAndTitleProps) => {
	return (
		<View>
			<Text>{props.title}</Text>
			<TextInput
				secureTextEntry={!!props.protected}
				style={styles.input}
				autoCapitalize="none"
				onChangeText={props.onChange}
			/>
			<View style={styles.separator} />
		</View>
	);
};
