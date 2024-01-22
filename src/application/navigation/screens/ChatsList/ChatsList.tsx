import {useSessionContext} from '../../../../features/session/SessionContext';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Button} from '../../../../ui/components/atoms/Button';
import {ChatsListScreenProps} from '../../types';
import {ChatOptions} from './ChatOptions';
import {
  useUserChats,
  addChatToUser,
} from 'react-native-chat-sdk/methods/chatHooks/user';
import {
  ThreadRole,
  hasPermission,
} from 'react-native-chat-sdk/methods/chatHooks/threadRole';
import {
  createThread,
  getThread,
} from 'react-native-chat-sdk/methods/chatHooks/getThreadData';

import uuid from 'react-native-uuid';

const ItemSeparatorComponent = () => <View style={{height: 10}} />;

export const ChatsList = ({navigation}: ChatsListScreenProps) => {
  const {userId, logOut} = useSessionContext();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState('');
  const {chats, loading: isUserChatLoading} = useUserChats(userId);
  const [isCreateThreadLoading, setIsCreateThreadLoading] = useState(false);

  const checkUserPermission = useCallback(
    (operation: ThreadRole) => {
      const chat = chats.find(({id}) => id === selectedChatId);
      if (chat && userId) {
        const role = chat.usersRoles[userId];
        if (role) {
          return hasPermission(role, operation);
        }
      }
      return false;
    },
    [chats, selectedChatId, userId],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={chats}
        renderItem={({item}) => {
          return (
            <View style={styles.buttonsContainer}>
              <View style={styles.chatItemContainer}>
                <Button
                  title={item.id}
                  onPress={async () => {
                    const chat = await getThread(item.id);
                    if (chat) {
                      navigation.navigate('Chat', chat);
                    }
                  }}
                  style={styles.item}
                />
              </View>
              <View style={styles.optionsItemContainer}>
                <Button
                  title="Options"
                  onPress={() => {
                    setSelectedChatId(item.id);
                    setShowOptions(true);
                  }}
                  style={styles.item}
                />
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={
          <Button
            title={
              isUserChatLoading || isCreateThreadLoading
                ? 'Loading!'
                : 'Add New Chat  +'
            }
            onPress={async () => {
              try {
                setIsCreateThreadLoading(true);
                if (userId) {
                  const chatId = await createThread(userId, {
                    id: uuid.v4().toString(),
                    creatorId: userId,
                  });
                  await addChatToUser(chatId, userId);
                }
              } catch (error) {
                console.error(error);
              } finally {
                setIsCreateThreadLoading(false);
              }
            }}
            style={styles.button}
          />
        }
      />
      <Button title={'Log out'} onPress={logOut} style={styles.button} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(!showOptions);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ChatOptions
              chatId={selectedChatId}
              canManageUsers={checkUserPermission(ThreadRole.ManageUsers)}
              canDeleteThread={checkUserPermission(ThreadRole.DeleteThread)}
              onDismiss={() => setShowOptions(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderWidth: 2,
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatItemContainer: {
    flex: 0.7,
  },
  optionsItemContainer: {
    flex: 0.3,
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
