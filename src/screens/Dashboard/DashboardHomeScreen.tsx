import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components/UI';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Bell,
  Settings,
  Activity,
  Star
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DashboardHomeScreen = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12.5%',
      icon: <DollarSign color="#22c55e" size={24} />,
      color: 'success',
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+5.2%',
      icon: <Users color="#0ea5e9" size={24} />,
      color: 'primary',
    },
    {
      title: 'Orders',
      value: '89',
      change: '+18.1%',
      icon: <ShoppingBag color="#f59e0b" size={24} />,
      color: 'warning',
    },
    {
      title: 'Growth',
      value: '32%',
      change: '+2.4%',
      icon: <TrendingUp color="#8b5cf6" size={24} />,
      color: 'secondary',
    },
  ];

  const recentActivities = [
    {
      title: 'New order received',
      description: 'Order #1234 from John Doe',
      time: '2 minutes ago',
      icon: <ShoppingBag color="#0ea5e9" size={20} />,
    },
    {
      title: 'Payment processed',
      description: 'Payment of $299.99 completed',
      time: '5 minutes ago',
      icon: <DollarSign color="#22c55e" size={20} />,
    },
    {
      title: 'New user registered',
      description: 'Jane Smith joined the platform',
      time: '15 minutes ago',
      icon: <Users color="#f59e0b" size={20} />,
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
            <View>
              <Text className="text-2xl font-bold text-secondary-900">
                Dashboard
              </Text>
              <Text className="text-secondary-600">
                Welcome back! Here's what's happening today.
              </Text>
            </View>
            <View className="flex-row space-x-2">
              <Button
                onPress={() => {}}
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full p-0"
              >
                <Bell color="#64748b" size={20} />
              </Button>
              <Button
                onPress={() => {}}
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full p-0"
              >
                <Settings color="#64748b" size={20} />
              </Button>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Overview
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {stats.map((stat, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <Card variant="elevated" className="h-32">
                  <View className="flex-1 justify-between">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-sm text-secondary-600 mb-1">
                          {stat.title}
                        </Text>
                        <Text className="text-2xl font-bold text-secondary-900">
                          {stat.value}
                        </Text>
                      </View>
                      <View className="ml-2">
                        {stat.icon}
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      <TrendingUp color="#22c55e" size={16} />
                      <Text className="text-sm text-success-600 ml-1">
                        {stat.change}
                      </Text>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row space-x-4">
            <Button
              title="Add Product"
              onPress={() => {}}
              variant="primary"
              size="md"
              className="flex-1"
            />
            <Button
              title="View Orders"
              onPress={() => {}}
              variant="outline"
              size="md"
              className="flex-1"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Recent Activity
          </Text>
          <Card variant="elevated">
            <View className="space-y-4">
              {recentActivities.map((activity, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="w-10 h-10 rounded-full bg-secondary-100 items-center justify-center mr-3">
                    {activity.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium text-secondary-900">
                      {activity.title}
                    </Text>
                    <Text className="text-sm text-secondary-600">
                      {activity.description}
                    </Text>
                    <Text className="text-xs text-secondary-500 mt-1">
                      {activity.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Performance Chart Placeholder */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Performance
          </Text>
          <Card variant="elevated" className="h-48">
            <View className="flex-1 items-center justify-center">
              <Activity color="#64748b" size={48} />
              <Text className="text-secondary-600 mt-2">
                Chart placeholder
              </Text>
              <Text className="text-sm text-secondary-500 text-center mt-1">
                Performance metrics would be displayed here
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardHomeScreen;
