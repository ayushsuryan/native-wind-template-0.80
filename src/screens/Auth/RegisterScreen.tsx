import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Mock register, navigate to OTP
    navigation.navigate('Otp');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Register</Text>
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
        className="bg-green-500 px-6 py-3 rounded-full w-full mb-3"
        onPress={handleRegister}
      >
        <Text className="text-white text-lg font-medium text-center">Register</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-500 text-base">Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
