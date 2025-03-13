import { View } from 'react-native';
import styled from 'styled-components/native';

type TextProps = {
  bold?: boolean;
  textColor?: string;
}

interface ButtonProps {
  height?: string;
  variant?: 'outlined' | 'filled';
  borderColor?: string;
  backgroundColor?: string;
  centered?: boolean;
}

export const ButtonStyled = styled.View<ButtonProps>`
  width: 100%;
  height: ${({ height }: ButtonProps) => height || '40px'};
  border-radius: 8px;
  border: ${({ variant }: ButtonProps) => (variant === 'outlined' ? '3px solid' : 'none')};
  border-color: ${({ borderColor }: ButtonProps) => (borderColor !== 'none' ? borderColor : 'transparent')};
  background-color: ${({ backgroundColor }: ButtonProps) => (backgroundColor !== 'none' ? backgroundColor : 'transparent')};
  display: flex;
  flex-direction: row;
  justify-content: ${({ centered }: ButtonProps) => (centered ? 'center' : 'space-between')};
  align-items: center;
  padding: 10px;
`;

export const Text = styled.Text<TextProps>`
  font-family: ${({ bold }: TextProps) => (bold ? 'Poppins_700Bold' : 'Poppins_400Regular')};
  font-size: 13px;
  color: ${({ textColor }: TextProps) => textColor};
  text-align: center;
`;
