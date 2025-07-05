import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../../components/UI';
import { Search, Filter, Heart, Star, ShoppingCart } from 'lucide-react-native';

const ProductsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home' },
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      rating: 4.5,
      reviews: 128,
      category: 'electronics',
      image: '🎧',
      inStock: true,
    },
    {
      id: 2,
      name: 'Cotton T-Shirt',
      price: 29.99,
      rating: 4.3,
      reviews: 85,
      category: 'clothing',
      image: '👕',
      inStock: true,
    },
    {
      id: 3,
      name: 'JavaScript Guide',
      price: 45.99,
      rating: 4.8,
      reviews: 203,
      category: 'books',
      image: '📚',
      inStock: false,
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 89.99,
      rating: 4.6,
      reviews: 156,
      category: 'home',
      image: '☕',
      inStock: true,
    },
    {
      id: 5,
      name: 'Smartphone',
      price: 699.99,
      rating: 4.7,
      reviews: 342,
      category: 'electronics',
      image: '📱',
      inStock: true,
    },
    {
      id: 6,
      name: 'Sneakers',
      price: 129.99,
      rating: 4.4,
      reviews: 91,
      category: 'clothing',
      image: '👟',
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProduct = ({ item }) => (
    <Card variant="elevated" className="mb-4">
      <View className="flex-row">
        <View className="w-20 h-20 bg-secondary-100 rounded-xl items-center justify-center mr-4">
          <Text className="text-3xl">{item.image}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-lg font-semibold text-secondary-900 flex-1">
              {item.name}
            </Text>
            <Button
              title=""
              onPress={() => {}}
              variant="outline"
              size="sm"
              className="w-8 h-8 rounded-full p-0 border-0"
            >
              <Heart color="#64748b" size={16} />
            </Button>
          </View>
          <View className="flex-row items-center mb-2">
            <Star color="#f59e0b" size={16} />
            <Text className="text-sm text-secondary-600 ml-1">
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-primary-600">
              ${item.price}
            </Text>
            <View className="flex-row items-center space-x-2">
              {!item.inStock && (
                <Text className="text-xs text-error-500 font-medium">
                  Out of Stock
                </Text>
              )}
              <Button
                title=""
                onPress={() => {}}
                variant={item.inStock ? "primary" : "secondary"}
                size="sm"
                disabled={!item.inStock}
                className="w-8 h-8 rounded-full p-0"
              >
                <ShoppingCart color="white" size={16} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-secondary-900">
            Products
          </Text>
          <Button
            title=""
            onPress={() => {}}
            variant="outline"
            size="sm"
            className="w-10 h-10 rounded-full p-0"
          >
            <Filter color="#64748b" size={20} />
          </Button>
        </View>
        
        {/* Search */}
        <Input
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          leftIcon={<Search color="#64748b" size={20} />}
          containerClassName="mb-0"
        />
      </View>

      {/* Categories */}
      <View className="px-6 py-4 bg-white border-b border-secondary-200">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              title={category.name}
              onPress={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              size="sm"
              className="mr-2"
            />
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <View className="flex-1 px-6 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-secondary-900">
            {filteredProducts.length} Products
          </Text>
          <Button
            title="Sort"
            onPress={() => {}}
            variant="outline"
            size="sm"
          />
        </View>
        
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center py-12">
              <Text className="text-secondary-500 text-center">
                No products found matching your criteria
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;
