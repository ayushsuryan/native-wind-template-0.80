import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store';
import { increment, decrement } from '../store/slices/counterSlice';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state: RootState) => state.counter.value);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Count: {count}</Text>

      <Pressable
        onPress={() => dispatch(increment())}
        className="bg-blue-500 px-6 py-3 rounded-full mb-3"
      >
        <Text className="text-white text-lg font-medium">Increment</Text>
      </Pressable>

      <Pressable
        onPress={() => dispatch(decrement())}
        className="bg-red-500 px-6 py-3 rounded-full"
      >
        <Text className="text-white text-lg font-medium">Decrement</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
