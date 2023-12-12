import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
	launchCamera,
	launchImageLibrary,
	ImageLibraryOptions,
} from 'react-native-image-picker';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {fstorage} from '@infrastructure/firebase';
import uuid from 'react-native-uuid';

// Managing an ascii blank character to place on the input once the user selects an image, because giftedchat doesn't call the onSend function unless there is something on the input. Before sending the message we must remove that emtpy ascii.
const EMPTY_ASCII = '​';
const EMPTY_STRING = '';

const useSendImage = () => {
	const [attachedImage, setAttachedImage] = useState(EMPTY_STRING);
	const [textInput, setTextInput] = useState(EMPTY_STRING);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const {width: deviceWidth} = useWindowDimensions();

	const onSetUploadProgress = (currentProgress: number) => {
		setUploadProgress(currentProgress);
	};

	const onRemoveAttached = () => {
		setAttachedImage(EMPTY_STRING);
		if (textInput === EMPTY_ASCII) {
			setTextInput(EMPTY_STRING);
		}
	};

	const onSetTextInput = (text: string) => {
		setTextInput(attachedImage && text === EMPTY_STRING ? EMPTY_ASCII : text);
	};

	const onOpenCamera = () => {
		let options: ImageLibraryOptions = {
			mediaType: 'photo',
			quality: 0.1,
		};
		launchCamera(options, response => {
			if (response.didCancel) {
				console.log('user cancelled camera image picker');
			} else if (response.errorCode) {
				console.log('camera image error', response.errorMessage);
			} else {
				let imageUri = response.assets?.[0]?.uri;
				if (imageUri) {
					setAttachedImage(imageUri);
					if (textInput.trim() === EMPTY_STRING) {
						setTextInput(EMPTY_ASCII);
					}
				}
			}
		});
	};

	const onOpenGallery = () => {
		let options: ImageLibraryOptions = {
			mediaType: 'photo',
			quality: 0.1,
		};

		launchImageLibrary(options, response => {
			if (response.didCancel) {
				console.log('user cancelled image picker');
			} else if (response.errorCode) {
				console.log('image error', response.errorMessage);
			} else {
				let imageUri = response.assets?.[0]?.uri;
				if (imageUri) {
					setAttachedImage(imageUri);
					if (textInput.trim() === EMPTY_STRING) {
						setTextInput(EMPTY_ASCII);
					}
				}
			}
		});
	};

	const onUploadImage = async (
		imageUri: string,
		onSuccessUpload: (assetUrl: string) => void,
	) => {
		if (imageUri) {
			setIsUploading(true);
			const response = await fetch(imageUri);
			const blob = await response.blob();

			const storageRef = ref(fstorage, 'ChatImages/' + uuid.v4().toString());
			const uploadTask = uploadBytesResumable(storageRef, blob);

			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(progress);
				},
				error => {
					console.log(error);
					setIsUploading(false);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
						onSuccessUpload(downloadURL);
						setAttachedImage(EMPTY_STRING);
						setIsUploading(false);
						if (textInput === EMPTY_ASCII) {
							setTextInput(EMPTY_STRING);
						}
					});
				},
			);
		}
	};

	return {
		attachedImage,
		textInput,
		isUploading,
		uploadProgress,
		deviceWidth,
		onSetUploadProgress,
		onSetTextInput,
		onOpenCamera,
		onOpenGallery,
		onRemoveAttached,
		onUploadImage,
	};
};

export default useSendImage;
