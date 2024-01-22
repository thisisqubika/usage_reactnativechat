import {useSessionContext} from '../../../../features/session/SessionContext';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../../ui/components/atoms/Button';
import {InputAndTitle} from '../../../../ui/components/atoms/InputAndTitle';

export const Home = () => {
  const [inputUserId, setInputUserId] = useState('');

  const {logIn} = useSessionContext();

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <InputAndTitle
          title="UserId"
          currentValue={inputUserId}
          onChange={setInputUserId}
        />

        <View style={styles.separator} />
        <Button
          style={styles.button}
          title="Login"
          onPress={() => logIn(inputUserId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'gray',
  },
  separator: {
    height: 24,
  },
});
