import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ProgressBarProps {
	progress: number;
	barWidth?: number;
	extraStyles?: ViewStyle;
}

const ProgressBar = ({
	progress,
	barWidth = 230,
	extraStyles,
}: ProgressBarProps) => {
	const progressWidth = (progress / 100) * barWidth;

	return (
		<View style={[{width: barWidth}, styles.progressContainer, extraStyles]}>
			<View style={[styles.progress, {width: progressWidth}]} />
		</View>
	);
};

export default React.memo(ProgressBar);

const styles = StyleSheet.create({
	progressContainer: {
		height: 4,
		backgroundColor: '#999',
	},
	progress: {
		height: '100%',
		backgroundColor: '#2388e5',
	},
});
