import React from 'react';
import { View, Text } from 'react-native';

const DashboardHomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Dashboard Home</Text>
      <Text className="text-lg text-gray-700">Welcome to your dashboard!</Text>
    </View>
  );
};

export default DashboardHomeScreen;
