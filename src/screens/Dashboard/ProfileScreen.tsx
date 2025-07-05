import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/userSlice';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Button, Card } from '../../components/UI';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Edit3,
  Star,
  Award
} from 'lucide-react-native';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const profileStats = [
    { label: 'Orders', value: '24', color: '#0ea5e9' },
    { label: 'Reviews', value: '15', color: '#22c55e' },
    { label: 'Points', value: '1,250', color: '#f59e0b' },
  ];

  const menuItems = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: <Edit3 color="#64748b" size={20} />,
      onPress: () => {},
    },
    {
      title: 'Notifications',
      description: 'Manage your notification preferences',
      icon: <Bell color="#64748b" size={20} />,
      onPress: () => {},
    },
    {
      title: 'Security',
      description: 'Password and security settings',
      icon: <Shield color="#64748b" size={20} />,
      onPress: () => {},
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: <CreditCard color="#64748b" size={20} />,
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      description: 'Get help or contact support',
      icon: <HelpCircle color="#64748b" size={20} />,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="px-6 py-4 bg-white border-b border-secondary-200">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-secondary-900">
              Profile
            </Text>
            <Button
              title=""
              onPress={() => {}}
              variant="outline"
              size="sm"
              className="w-10 h-10 rounded-full p-0"
            >
              <Settings color="#64748b" size={20} />
            </Button>
          </View>
        </View>

        {/* Profile Header */}
        <View className="px-6 py-6 bg-white">
          <View className="items-center">
            <View className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full items-center justify-center mb-4 shadow-lg">
              <User color="white" size={40} />
            </View>
            <Text className="text-2xl font-bold text-secondary-900 mb-1">
              John Doe
            </Text>
            <Text className="text-secondary-600 mb-2">
              john.doe@example.com
            </Text>
            <View className="flex-row items-center mb-4">
              <Star color="#f59e0b" size={16} />
              <Text className="text-secondary-600 ml-1">4.8 Rating</Text>
            </View>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              variant="outline"
              size="sm"
            />
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 py-4">
          <Card variant="elevated">
            <View className="flex-row justify-around py-2">
              {profileStats.map((stat, index) => (
                <View key={index} className="items-center">
                  <Text className="text-2xl font-bold text-secondary-900 mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-sm text-secondary-600">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Achievements */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Achievements
          </Text>
          <Card variant="elevated">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-warning-100 rounded-full items-center justify-center mr-4">
                <Award color="#f59e0b" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-secondary-900">
                  Loyalty Badge
                </Text>
                <Text className="text-sm text-secondary-600">
                  Earned for being a loyal customer
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Menu Items */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Settings
          </Text>
          <Card variant="elevated">
            <View className="space-y-1">
              {menuItems.map((item, index) => (
                <View key={index}>
                  <Button
                    title=""
                    onPress={item.onPress}
                    variant="outline"
                    size="md"
                    className="bg-transparent border-0 p-4 w-full justify-start"
                  >
                    <View className="flex-row items-center w-full">
                      <View className="mr-3">
                        {item.icon}
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-medium text-secondary-900 text-left">
                          {item.title}
                        </Text>
                        <Text className="text-sm text-secondary-600 text-left">
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </Button>
                  {index < menuItems.length - 1 && (
                    <View className="h-px bg-secondary-200 mx-4" />
                  )}
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Logout Button */}
        <View className="px-6 py-4">
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="error"
            size="lg"
            fullWidth
            className="flex-row items-center justify-center"
          >
            <LogOut color="white" size={20} />
            <Text className="text-white text-lg font-semibold ml-2">
              Sign Out
            </Text>
          </Button>
        </View>

        {/* App Version */}
        <View className="items-center py-4">
          <Text className="text-xs text-secondary-500">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
