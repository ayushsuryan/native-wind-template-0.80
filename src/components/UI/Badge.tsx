import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}: BadgeProps) => {
  const getBadgeStyles = () => {
    let baseStyles = 'rounded-full items-center justify-center';
    
    // Size styles
    switch (size) {
      case 'sm':
        baseStyles += ' px-2 py-1';
        break;
      case 'md':
        baseStyles += ' px-3 py-1';
        break;
      case 'lg':
        baseStyles += ' px-4 py-2';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyles += ' bg-secondary-100';
        break;
      case 'primary':
        baseStyles += ' bg-primary-100';
        break;
      case 'secondary':
        baseStyles += ' bg-secondary-100';
        break;
      case 'success':
        baseStyles += ' bg-success-100';
        break;
      case 'warning':
        baseStyles += ' bg-warning-100';
        break;
      case 'error':
        baseStyles += ' bg-error-100';
        break;
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    let textStyles = 'font-medium';
    
    // Size styles
    switch (size) {
      case 'sm':
        textStyles += ' text-xs';
        break;
      case 'md':
        textStyles += ' text-sm';
        break;
      case 'lg':
        textStyles += ' text-base';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'default':
        textStyles += ' text-secondary-700';
        break;
      case 'primary':
        textStyles += ' text-primary-700';
        break;
      case 'secondary':
        textStyles += ' text-secondary-700';
        break;
      case 'success':
        textStyles += ' text-success-700';
        break;
      case 'warning':
        textStyles += ' text-warning-700';
        break;
      case 'error':
        textStyles += ' text-error-700';
        break;
    }
    
    return textStyles;
  };

  return (
    <View className={cn(getBadgeStyles(), className)}>
      {typeof children === 'string' ? (
        <Text className={getTextStyles()}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

export default Badge;
export type { BadgeProps };