import React from 'react';
import { View, Text } from 'react-native';

const ProductsScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Products</Text>
      <Text className="text-lg text-gray-700">List of products will appear here.</Text>
    </View>
  );
};

export default ProductsScreen;
