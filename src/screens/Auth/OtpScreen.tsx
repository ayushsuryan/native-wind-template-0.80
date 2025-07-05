import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/userSlice';
import { Button, Input, Card, Avatar } from '../../components/UI';
import { Shield, ArrowLeft } from 'lucide-react-native';

const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    // Mock OTP verify delay
    setTimeout(() => {
      dispatch(login({ email: 'user@example.com' }));
      setIsLoading(false);
      // Navigation will automatically switch to DashboardNavigator due to AppNavigator logic
    }, 1500);
  };

  const handleResendOtp = () => {
    // Mock resend OTP functionality
    console.log('Resending OTP...');
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-primary-50 to-secondary-50">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-6 justify-center">
          {/* Back Button */}
          <View className="absolute top-4 left-6 z-10">
            <Button
              onPress={() => navigation.goBack()}
              variant="outline"
              size="sm"
              className="w-10 h-10 rounded-full p-0 bg-white border-secondary-300"
            >
              <ArrowLeft color="#64748b" size={20} />
            </Button>
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Avatar
              size="lg"
              icon={<Shield color="white" size={32} />}
              className="mb-6 shadow-lg"
            />
            <Text className="text-3xl font-bold text-secondary-900 mb-3">
              OTP Verification
            </Text>
            <Text className="text-lg text-secondary-600 text-center">
              Enter the 6-digit code sent to your phone
            </Text>
            <Text className="text-sm text-secondary-500 text-center mt-2">
              We've sent a verification code to{'\n'}
              <Text className="font-medium">+1 (555) 123-4567</Text>
            </Text>
          </View>

          {/* OTP Form */}
          <Card variant="elevated" className="mb-6">
            <View className="items-center space-y-6">
              <Input
                placeholder="000000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                className="text-center text-2xl font-bold tracking-widest"
                containerClassName="w-full"
              />

              <Button
                title="Verify Code"
                onPress={handleVerify}
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={otp.length !== 6}
              />
            </View>
          </Card>

          {/* Resend Section */}
          <View className="items-center">
            <Text className="text-secondary-600 text-base mb-2">
              Didn't receive the code?
            </Text>
            <Button
              title="Resend OTP"
              onPress={handleResendOtp}
              variant="outline"
              size="sm"
              className="bg-transparent border-0"
            />
          </View>

          {/* Timer */}
          <View className="items-center mt-6">
            <Text className="text-sm text-secondary-500">
              Code expires in 02:30
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;
