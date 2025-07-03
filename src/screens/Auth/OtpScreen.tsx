import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/userSlice';

const OtpScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Mock OTP verify, set user as authenticated and navigate to Dashboard
    dispatch(login({ email: 'user@example.com' }));
    // Navigation will automatically switch to DashboardNavigator due to AppNavigator logic
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">OTP Verification</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-6 text-center"
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />
      <Pressable
        className="bg-blue-500 px-6 py-3 rounded-full w-full"
        onPress={handleVerify}
      >
        <Text className="text-white text-lg font-medium text-center">Verify</Text>
      </Pressable>
    </View>
  );
};

export default OtpScreen;
