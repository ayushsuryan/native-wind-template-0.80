import React, { forwardRef } from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<TextInputProps, 'className'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  helperText,
  variant = 'outlined',
  size = 'md',
  leftIcon,
  rightIcon,
  containerClassName = '',
  className = '',
  ...props
}, ref) => {
  const getInputStyles = () => {
    let baseStyles = 'font-medium text-secondary-900';
    
    // Size styles
    switch (size) {
      case 'sm':
        baseStyles += ' text-sm py-2';
        break;
      case 'md':
        baseStyles += ' text-base py-3';
        break;
      case 'lg':
        baseStyles += ' text-lg py-4';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyles += ' border-b border-secondary-300 bg-transparent';
        break;
      case 'filled':
        baseStyles += ' bg-secondary-100 rounded-xl px-4';
        break;
      case 'outlined':
        baseStyles += ' border border-secondary-300 bg-white rounded-xl px-4';
        break;
    }
    
    // Error state
    if (error) {
      baseStyles += ' border-error-500';
    }
    
    // Icon padding
    if (leftIcon) {
      baseStyles += ' pl-12';
    }
    if (rightIcon) {
      baseStyles += ' pr-12';
    }
    
    return baseStyles;
  };

  return (
    <View className={cn('mb-4', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-secondary-700 mb-2">
          {label}
        </Text>
      )}
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            {leftIcon}
          </View>
        )}
        <TextInput
          ref={ref}
          className={cn(getInputStyles(), className)}
          placeholderTextColor="#94a3b8"
          {...props}
        />
        {rightIcon && (
          <View className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text className="text-xs text-error-500 mt-1 ml-1">
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text className="text-xs text-secondary-500 mt-1 ml-1">
          {helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
export type { InputProps };