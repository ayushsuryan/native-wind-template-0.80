
import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-4xl font-bold mb-8">Welcome!</Text>
      <Text className="text-lg text-gray-700 mb-12 text-center">This is the landing page. Please login or register to continue.</Text>

      <Pressable
        onPress={() => navigation.navigate('Login')}
        className="bg-blue-500 px-8 py-4 rounded-full w-full mb-4"
      >
        <Text className="text-white text-lg font-semibold text-center">Login</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Register')}
        className="bg-green-500 px-8 py-4 rounded-full w-full"
      >
        <Text className="text-white text-lg font-semibold text-center">Register</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
