import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/userSlice';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';


const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Profile</Text>
      <Text className="text-lg text-gray-700 mb-8">User profile details go here.</Text>
      <Pressable
        onPress={handleLogout}
        className="bg-red-500 px-8 py-3 rounded-full"
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
