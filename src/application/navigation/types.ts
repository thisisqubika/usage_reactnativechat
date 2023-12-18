import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatThread} from 'reactnativechat/RNChat/src/index';

export type RootStackParamList = {
  Home: undefined;
  ChatsList: undefined;
  Chat: ChatThread;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type ChatsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatsList'
>;

export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Chat'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
