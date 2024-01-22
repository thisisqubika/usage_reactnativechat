import {useEffect} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {focusManager} from '@tanstack/react-query';

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

export const useLinkQueryToScreenFocus = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);
};
