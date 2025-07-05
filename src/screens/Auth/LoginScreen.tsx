import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Button, Input, Card } from '../../components/UI';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigation.navigate('Otp');
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-primary-50 to-secondary-50">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View className="items-center pt-12 pb-8">
            <View className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full items-center justify-center mb-6 shadow-lg">
              <Lock color="white" size={32} />
            </View>
            <Text className="text-3xl font-bold text-secondary-900 mb-3">
              Welcome Back
            </Text>
            <Text className="text-lg text-secondary-600 text-center">
              Sign in to your account
            </Text>
          </View>

          {/* Login Form */}
          <Card variant="elevated" className="mb-6">
            <View className="space-y-4">
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail color="#64748b" size={20} />}
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                leftIcon={<Lock color="#64748b" size={20} />}
                rightIcon={
                  <Button
                    onPress={() => setShowPassword(!showPassword)}
                    variant="outline"
                    size="sm"
                    className="p-0 border-0 bg-transparent"
                  >
                    {showPassword ? 
                      <EyeOff color="#64748b" size={20} /> : 
                      <Eye color="#64748b" size={20} />
                    }
                  </Button>
                }
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                className="mt-6"
              />
            </View>
          </Card>

          {/* Additional Options */}
          <View className="items-center mb-6">
            <Button
              title="Forgot Password?"
              onPress={() => {}}
              variant="outline"
              size="sm"
              className="bg-transparent border-0"
            />
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-secondary-300" />
            <Text className="px-4 text-secondary-500 text-sm">or</Text>
            <View className="flex-1 h-px bg-secondary-300" />
          </View>

          {/* Social Login */}
          <Card variant="outlined" className="mb-6">
            <View className="items-center py-4">
              <Text className="text-secondary-700 font-medium mb-4">
                Continue with Social
              </Text>
              <View className="flex-row space-x-4">
                <Button
                  title="Google"
                  onPress={() => {}}
                  variant="outline"
                  size="md"
                  className="flex-1"
                />
                <Button
                  title="Apple"
                  onPress={() => {}}
                  variant="secondary"
                  size="md"
                  className="flex-1"
                />
              </View>
            </View>
          </Card>

          {/* Sign Up Link */}
          <View className="items-center flex-row justify-center">
            <Text className="text-secondary-600 text-base">
              Don't have an account?{' '}
            </Text>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              size="sm"
              className="bg-transparent border-0 p-0"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
