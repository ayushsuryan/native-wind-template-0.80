import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OtpScreen from '../screens/Auth/OtpScreen';

export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Otp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={require('../screens/HomeScreen').default} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Otp" component={OtpScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
