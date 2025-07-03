import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const RootNavigation = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default RootNavigation;
