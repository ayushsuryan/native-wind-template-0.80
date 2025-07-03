import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login, navigate to OTP
    navigation.navigate('Otp');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Login</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        className="bg-blue-500 px-6 py-3 rounded-full w-full mb-3"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-medium text-center">Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text className="text-blue-500 text-base">Don't have an account? Register</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
