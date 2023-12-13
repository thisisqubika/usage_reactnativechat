import {useSessionContext} from '@features/session/SessionContext';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
	addUserToChat,
	deleteThread,
} from '../../../../infrastructure/chatHooks';
import {
	addChatToUser,
	removeUserFromThread,
} from '../../../../infrastructure/chatHooks/user';
import {Button} from '../../../../ui/components/atoms/Button';
import {InputAndTitle} from '../../../../ui/components/atoms/InputAndTitle';

const styles = StyleSheet.create({
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	addButton: {
		backgroundColor: 'gray',
		padding: 5,
		justifyContent: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		alignContent: 'center',
	},
	closeButton: {
		backgroundColor: 'gray',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	horizontalSeparator: {
		width: 16,
	},
	verticalSeparator: {
		height: 16,
	},
});

export interface ChatOptionsProps {
	chatId: string;
	canManageUsers?: boolean;
	canDeleteThread?: boolean;
	onDismiss: () => void;
}

const VerticalSeparator = () => {
	return <View style={styles.verticalSeparator} />;
};

const HorizontalSeparator = () => {
	return <View style={styles.verticalSeparator} />;
};

export const ChatOptions: React.FC<ChatOptionsProps> = props => {
	const {userId} = useSessionContext();
	const [loading, setLoading] = useState(false);
	const [userToInvite, setUserToInvite] = useState('');
	const [userToRemove, setUserToRemove] = useState('');
	return (
		<View>
			<Text style={styles.modalText}>{props.chatId}</Text>
			<View>
				{props.canManageUsers && (
					<>
						<View style={styles.inputContainer}>
							<View style={{flex: 1}}>
								<InputAndTitle
									title="Add a user"
									currentValue={'password'}
									onChange={setUserToInvite}
								/>
							</View>
							<HorizontalSeparator />
							<Button
								title="Add"
								onPress={async () => {
									if (!loading) {
										try {
											setLoading(true);
											await addChatToUser(props.chatId, `${userToInvite}`);
											await addUserToChat(props.chatId, userToInvite);
										} catch (error) {
											console.error(error);
										} finally {
											setLoading(false);
										}
									}
								}}
								style={styles.addButton}
							/>
						</View>
						<VerticalSeparator />
						<View style={styles.inputContainer}>
							<View style={{flex: 1}}>
								<InputAndTitle
									title="Remove a user"
									currentValue={'password'}
									onChange={setUserToRemove}
								/>
							</View>
							<HorizontalSeparator />
							<Button
								title="Remove"
								onPress={async () => {
									if (!loading) {
										try {
											setLoading(true);
											await removeUserFromThread(props.chatId, userToRemove);
										} catch (error) {
											console.error(error);
										} finally {
											setLoading(false);
										}
									}
								}}
								style={styles.addButton}
							/>
						</View>
						<VerticalSeparator />
					</>
				)}
				{props.canDeleteThread && (
					<>
						<Button
							title="Delete Chat"
							onPress={async () => {
								if (!loading) {
									try {
										setLoading(true);
										await deleteThread(props.chatId);
									} catch (error) {
										console.error(error);
									} finally {
										setLoading(false);
									}
								}
								props.onDismiss();
							}}
							style={styles.addButton}
						/>
						<VerticalSeparator />
					</>
				)}
				<Button
					title={'Remove this chat from my chats'}
					onPress={async () => {
						if (!loading) {
							try {
								if (userId) {
									setLoading(true);
									await removeUserFromThread(props.chatId, userId);
								}
							} catch (error) {
								console.error(error);
							} finally {
								setLoading(false);
							}
						}
						props.onDismiss();
					}}
					style={styles.addButton}
				/>
			</View>
			<VerticalSeparator />
			<Button
				title={loading ? 'Loading' : 'Close'}
				onPress={props.onDismiss}
				style={styles.closeButton}
			/>
		</View>
	);
};
