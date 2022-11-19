import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {createRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import ModalConfirm from './components/ModalConfirm';
import Navigation from './navigation';
import store from './redux';

export const _navigator = createNavigationContainerRef();
export const refModal = createRef();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={_navigator}>
        <SafeAreaProvider>
          <Navigation />

          <ModalConfirm ref={refModal} />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
