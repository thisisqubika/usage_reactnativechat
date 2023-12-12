import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ProgressBar from '@atoms/ProgressBar';

const RenderChatFooter = (
	attachedImageUri: string,
	onRemoveAttached: () => void,
	isSending: boolean,
	deviceWidth: number,
	sendProgress: number,
	removeIconImage: string,
) => {
	return (
		<>
			{attachedImageUri ? (
				<View style={styles.renderChatFooter}>
					{isSending && (
						<ProgressBar progress={sendProgress} barWidth={deviceWidth} />
					)}
					<View
						style={[
							styles.imgResumeContainer,
							{paddingTop: isSending ? 10 : 14},
						]}>
						<TouchableOpacity
							onPress={onRemoveAttached}
							disabled={isSending}
							style={[styles.removeButtonContainer, styles.resumeSideItem]}>
							<Image
								style={styles.removeImg}
								source={{
									uri: removeIconImage,
								}}
							/>
						</TouchableOpacity>
						<Image
							style={styles.attachedImage}
							source={{uri: attachedImageUri}}
							resizeMode="cover"
						/>
						<View style={styles.resumeSideItem} />
					</View>
				</View>
			) : null}
		</>
	);
};

export default RenderChatFooter;

const styles = StyleSheet.create({
	renderChatFooter: {
		maxHeight: '55%',
		backgroundColor: '#d3dff2',
	},
	imgResumeContainer: {
		flexDirection: 'row',
		paddingBottom: 14,
	},
	resumeSideItem: {
		flex: 25,
	},
	removeButtonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	removeImg: {
		height: 40,
		width: 40,
	},
	attachedImage: {flex: 50, aspectRatio: 1},
});
