import React from 'react';
import { Text, Pressable, ActivityIndicator, PressableProps } from 'react-native';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onPress: () => void;
}

interface ButtonWithTitle extends BaseButtonProps {
  title: string;
  children?: never;
}

interface ButtonWithChildren extends BaseButtonProps {
  title?: never;
  children: React.ReactNode;
}

type ButtonProps = ButtonWithTitle | ButtonWithChildren;

const Button = ({ 
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const getButtonStyles = () => {
    let baseStyles = 'flex-row items-center justify-center rounded-2xl active:opacity-80';
    
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
        baseStyles += ' bg-primary-600';
        break;
      case 'secondary':
        baseStyles += ' bg-secondary-600';
        break;
      case 'success':
        baseStyles += ' bg-success-600';
        break;
      case 'warning':
        baseStyles += ' bg-warning-600';
        break;
      case 'error':
        baseStyles += ' bg-error-600';
        break;
      case 'outline':
        baseStyles += ' bg-transparent border-2 border-primary-600';
        break;
    }
    
    if (fullWidth) {
      baseStyles += ' w-full';
    }
    
    if (disabled || loading) {
      baseStyles += ' opacity-50';
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    let textStyles = 'font-semibold';
    
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

  const renderContent = () => {
    if ('children' in props && props.children) {
      return props.children;
    }
    
    if ('title' in props && props.title) {
      return <Text className={getTextStyles()}>{props.title}</Text>;
    }
    
    return null;
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
          style={{ marginRight: 8 }}
        />
      )}
      {renderContent()}
    </Pressable>
  );
};

export default Button;
export type { ButtonProps };