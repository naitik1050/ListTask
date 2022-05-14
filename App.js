import React from 'react';
import { View, LogBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Configurestore from './redux/store';
import { AppNavigation } from './navigators/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'

LogBox.ignoreAllLogs();

const { store, persistor } = Configurestore()

const Root = () => (
  <View style={styles.rootContainer}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  </View>
);

export default Root;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  }
});