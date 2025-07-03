
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardHomeScreen from '../screens/Dashboard/DashboardHomeScreen';
import ProductsScreen from '../screens/Dashboard/ProductsScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import { Home, ShoppingCart, User } from 'lucide-react-native';

export type DashboardTabParamList = {
  DashboardHome: undefined;
  Products: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();


const DashboardNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'DashboardHome') {
          return <Home stroke={color} width={size} height={size} />;
        } else if (route.name === 'Products') {
          return <ShoppingCart stroke={color} width={size} height={size} />;
        } else if (route.name === 'Profile') {
          return <User stroke={color} width={size} height={size} />;
        }
        return null;
      },
    })}
  >
    <Tab.Screen name="DashboardHome" component={DashboardHomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="Products" component={ProductsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default DashboardNavigator;
