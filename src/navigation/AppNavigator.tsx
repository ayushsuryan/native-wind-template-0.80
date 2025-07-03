import React from 'react';
import { useAppSelector } from '../store/hooks';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';

const AppNavigator = () => {
  // Replace with real auth state
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  return isAuthenticated ? <DashboardNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
