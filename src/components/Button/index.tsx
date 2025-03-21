import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonStyled, Text } from './style';

interface ButtonProps {
  backgroundColor: string;
  borderColor?: string | 'none';
  textColor: string;
  label: string;
  variant?: 'outlined' | 'default';
  onClick: () => void;
  bold?: boolean;
  height: string;
  centered?: boolean;
}

export function Button({
  backgroundColor,
  borderColor = 'none',
  textColor,
  label,
  onClick,
  variant,
  bold,
  height,
  centered,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <ButtonStyled
        variant={variant}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        centered={centered}
        height={height}
      >
        <Text bold={bold} textColor={textColor}>{label}</Text>
      </ButtonStyled>
    </TouchableOpacity>
  );
}
