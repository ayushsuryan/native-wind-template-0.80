import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Button, Input, Card, Avatar } from '../../components/UI';
import { Mail, Lock, User, UserPlus } from 'lucide-react-native';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Mock register delay
    setTimeout(() => {
      navigation.navigate('Otp');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-success-50 to-primary-50">
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
            <Avatar
              size="lg"
              icon={<UserPlus color="white" size={32} />}
              className="mb-6 shadow-lg bg-gradient-to-br from-success-500 to-success-600"
            />
            <Text className="text-3xl font-bold text-secondary-900 mb-3">
              Create Account
            </Text>
            <Text className="text-lg text-secondary-600 text-center">
              Join us and start your journey
            </Text>
          </View>

          {/* Register Form */}
          <Card variant="elevated" className="mb-6">
            <View className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                leftIcon={<User color="#64748b" size={20} />}
              />
              
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
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={<Lock color="#64748b" size={20} />}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                leftIcon={<Lock color="#64748b" size={20} />}
              />

              <Button
                title="Create Account"
                onPress={handleRegister}
                variant="success"
                size="lg"
                fullWidth
                loading={isLoading}
                className="mt-6"
              />
            </View>
          </Card>

          {/* Terms */}
          <View className="items-center mb-6">
            <Text className="text-sm text-secondary-600 text-center leading-relaxed">
              By creating an account, you agree to our{'\n'}
              <Text className="text-primary-600 font-medium">Terms of Service</Text> and{' '}
              <Text className="text-primary-600 font-medium">Privacy Policy</Text>
            </Text>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-secondary-300" />
            <Text className="px-4 text-secondary-500 text-sm">or</Text>
            <View className="flex-1 h-px bg-secondary-300" />
          </View>

          {/* Social Register */}
          <Card variant="outlined" className="mb-6">
            <View className="items-center py-4">
              <Text className="text-secondary-700 font-medium mb-4">
                Sign up with Social
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

          {/* Login Link */}
          <View className="items-center flex-row justify-center">
            <Text className="text-secondary-600 text-base">
              Already have an account?{' '}
            </Text>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
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

export default RegisterScreen;
