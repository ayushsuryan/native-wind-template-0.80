
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
      tabBarActiveTintColor: '#0ea5e9',
      tabBarInactiveTintColor: '#64748b',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 8,
        paddingBottom: 8,
        height: 65,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
      },
      tabBarIcon: ({ color, size, focused }) => {
        const iconSize = focused ? 24 : 20;
        const iconColor = focused ? '#0ea5e9' : '#64748b';
        
        if (route.name === 'DashboardHome') {
          return <Home stroke={iconColor} width={iconSize} height={iconSize} />;
        } else if (route.name === 'Products') {
          return <ShoppingCart stroke={iconColor} width={iconSize} height={iconSize} />;
        } else if (route.name === 'Profile') {
          return <User stroke={iconColor} width={iconSize} height={iconSize} />;
        }
        return null;
      },
    })}
  >
    <Tab.Screen 
      name="DashboardHome" 
      component={DashboardHomeScreen} 
      options={{ 
        title: 'Home',
        tabBarLabel: 'Home',
      }} 
    />
    <Tab.Screen 
      name="Products" 
      component={ProductsScreen}
      options={{
        title: 'Products',
        tabBarLabel: 'Products',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        title: 'Profile',
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

export default DashboardNavigator;
