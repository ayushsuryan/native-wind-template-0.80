
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import { Button, Card } from '../components/UI';
import { Sparkles, Shield, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const features = [
    {
      icon: <Sparkles color="#0ea5e9" size={32} />,
      title: 'Modern Design',
      description: 'Beautiful and intuitive user interface built with NativeWind',
    },
    {
      icon: <Shield color="#22c55e" size={32} />,
      title: 'Secure',
      description: 'Your data is protected with industry-standard security measures',
    },
    {
      icon: <Zap color="#f59e0b" size={32} />,
      title: 'Fast & Reliable',
      description: 'Optimized performance for the best user experience',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-primary-50 to-secondary-50">
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Section */}
        <View className="items-center pt-12 pb-8">
          <View className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full items-center justify-center mb-6 shadow-lg">
            <Sparkles color="white" size={40} />
          </View>
          <Text className="text-4xl font-bold text-secondary-900 mb-4 text-center">
            Welcome to
          </Text>
          <Text className="text-4xl font-bold text-primary-600 mb-4 text-center">
            NativeWind
          </Text>
          <Text className="text-lg text-secondary-600 text-center max-w-xs leading-relaxed">
            Your modern React Native app with Redux and beautiful UI components
          </Text>
        </View>

        {/* Features Section */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Why Choose Us?
          </Text>
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" className="mb-4">
              <View className="flex-row items-start">
                <View className="mr-4 mt-1">
                  {feature.icon}
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </Text>
                  <Text className="text-secondary-600 leading-relaxed">
                    {feature.description}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* CTA Section */}
        <Card variant="elevated" className="bg-gradient-to-r from-primary-500 to-primary-600 mb-6">
          <View className="items-center py-4">
            <Text className="text-white text-xl font-bold mb-2">
              Ready to get started?
            </Text>
            <Text className="text-primary-100 text-center mb-6 leading-relaxed">
              Join thousands of users who trust our platform for their daily needs
            </Text>
          </View>
        </Card>

        {/* Action Buttons */}
        <View className="space-y-4">
          <Button
            title="Login to Your Account"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            title="Create New Account"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            size="lg"
            fullWidth
          />
        </View>

        {/* Footer */}
        <View className="items-center mt-12 pt-6 border-t border-secondary-200">
          <Text className="text-secondary-500 text-sm text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
