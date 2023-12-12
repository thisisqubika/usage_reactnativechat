import React from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import {SendProps, Send, IMessage} from 'react-native-gifted-chat';

const RenderSend = (
	props: SendProps<IMessage>,
	onOpenCamera: () => void,
	onOpenGallery: () => void,
	isLoading: boolean,
	cameraIconImage: string,
	galleryIconImage: string,
	sendIconImage: string,
) => {
	return (
		<View style={styles.renderSend}>
			<TouchableOpacity
				onPress={onOpenCamera}
				style={styles.imgButtonContainer}>
				<Image
					style={styles.cameraImg}
					source={{
						uri: cameraIconImage,
					}}
					resizeMode="contain"
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onOpenGallery}
				style={styles.imgButtonContainer}>
				<Image
					style={styles.galleryImg}
					source={{
						uri: galleryIconImage,
					}}
					resizeMode="contain"
				/>
			</TouchableOpacity>
			<Send {...props} disabled={isLoading} containerStyle={styles.send}>
				{isLoading ? (
					<ActivityIndicator size="small" style={styles.activityIndicator} />
				) : (
					<Image
						style={styles.sendImg}
						source={{
							uri: sendIconImage,
						}}
					/>
				)}
			</Send>
		</View>
	);
};

export default RenderSend;

const styles = StyleSheet.create({
	renderSend: {
		height: '100%',
		flexDirection: 'row',
		marginRight: 20,
	},
	imgButtonContainer: {
		height: '100%',
		width: 30,
		justifyContent: 'center',
	},
	cameraImg: {
		height: 25,
		width: 25,
	},
	galleryImg: {
		height: 35,
		width: 35,
	},
	send: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	activityIndicator: {
		marginLeft: 15,
	},
	sendImg: {
		height: 30,
		width: 30,
		marginLeft: 15,
	},
});
