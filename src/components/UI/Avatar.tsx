import React from 'react';
import { View, Text, Image, ImageProps } from 'react-native';
import { cn } from '../../utils/cn';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  fallback?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Avatar = ({
  size = 'md',
  src,
  alt,
  fallback,
  icon,
  className = '',
}: AvatarProps) => {
  const getAvatarStyles = () => {
    let baseStyles = 'rounded-full items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600';
    
    switch (size) {
      case 'sm':
        baseStyles += ' w-8 h-8';
        break;
      case 'md':
        baseStyles += ' w-12 h-12';
        break;
      case 'lg':
        baseStyles += ' w-16 h-16';
        break;
      case 'xl':
        baseStyles += ' w-24 h-24';
        break;
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    let textStyles = 'font-bold text-white';
    
    switch (size) {
      case 'sm':
        textStyles += ' text-xs';
        break;
      case 'md':
        textStyles += ' text-sm';
        break;
      case 'lg':
        textStyles += ' text-lg';
        break;
      case 'xl':
        textStyles += ' text-2xl';
        break;
    }
    
    return textStyles;
  };

  const renderContent = () => {
    if (src) {
      return (
        <Image
          source={{ uri: src }}
          className={cn(getAvatarStyles(), 'bg-transparent')}
          alt={alt}
        />
      );
    }
    
    if (icon) {
      return icon;
    }
    
    if (fallback) {
      return (
        <Text className={getTextStyles()}>
          {fallback.charAt(0).toUpperCase()}
        </Text>
      );
    }
    
    return (
      <Text className={getTextStyles()}>
        ?
      </Text>
    );
  };

  return (
    <View className={cn(getAvatarStyles(), className)}>
      {renderContent()}
    </View>
  );
};

export default Avatar;
export type { AvatarProps };