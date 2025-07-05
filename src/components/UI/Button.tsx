import React from 'react';
import { Text, Pressable, ActivityIndicator } from 'react-native';
import { cn } from '../../utils/cn';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const getButtonStyles = () => {
    let baseStyles = 'flex-row items-center justify-center rounded-2xl active:opacity-80 transition-all';
    
    // Size styles
    switch (size) {
      case 'sm':
        baseStyles += ' px-4 py-2';
        break;
      case 'md':
        baseStyles += ' px-6 py-3';
        break;
      case 'lg':
        baseStyles += ' px-8 py-4';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyles += ' bg-primary-600 shadow-md';
        break;
      case 'secondary':
        baseStyles += ' bg-secondary-600 shadow-md';
        break;
      case 'success':
        baseStyles += ' bg-success-600 shadow-md';
        break;
      case 'warning':
        baseStyles += ' bg-warning-600 shadow-md';
        break;
      case 'error':
        baseStyles += ' bg-error-600 shadow-md';
        break;
      case 'outline':
        baseStyles += ' bg-transparent border-2 border-primary-600';
        break;
    }
    
    // Full width
    if (fullWidth) {
      baseStyles += ' w-full';
    }
    
    // Disabled state
    if (disabled || loading) {
      baseStyles += ' opacity-50';
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    let textStyles = 'font-semibold';
    
    // Size styles
    switch (size) {
      case 'sm':
        textStyles += ' text-sm';
        break;
      case 'md':
        textStyles += ' text-base';
        break;
      case 'lg':
        textStyles += ' text-lg';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'outline':
        textStyles += ' text-primary-600';
        break;
      default:
        textStyles += ' text-white';
        break;
    }
    
    return textStyles;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(getButtonStyles(), className)}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? '#0284c7' : '#ffffff'}
          className="mr-2"
        />
      )}
      <Text className={getTextStyles()}>{title}</Text>
    </Pressable>
  );
};

export default Button;