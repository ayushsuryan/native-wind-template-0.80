import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../utils/cn';

interface CardProps extends Omit<ViewProps, 'className'> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
}

const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) => {
  const getCardStyles = () => {
    let baseStyles = 'rounded-2xl';
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyles += ' bg-white';
        break;
      case 'elevated':
        baseStyles += ' bg-white shadow-lg';
        break;
      case 'outlined':
        baseStyles += ' bg-white border border-secondary-200';
        break;
    }
    
    // Padding styles
    switch (padding) {
      case 'none':
        // No padding
        break;
      case 'sm':
        baseStyles += ' p-3';
        break;
      case 'md':
        baseStyles += ' p-4';
        break;
      case 'lg':
        baseStyles += ' p-6';
        break;
      case 'xl':
        baseStyles += ' p-8';
        break;
    }
    
    return baseStyles;
  };

  return (
    <View className={cn(getCardStyles(), className)} {...props}>
      {children}
    </View>
  );
};

export default Card;
export type { CardProps };