import styled from 'styled-components/native';
import { colors } from '../../../themes/colors';

type ContainerProps = {
  color?: string;
};

export const Container = styled.View`
  width: 80%;
  margin: 20px 0;
`;

export const DropdownButton = styled.TouchableOpacity`
  padding: 15px;
  border-width: 1px;
  border-color: ${colors.lightOrange};
  border-radius: 5px;
  background-color: ${colors.orange};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${colors.lightOrange};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const DropdownList = styled.View`
  width: 80%;
  max-height: 200px;
  background-color: ${colors.white};
  border-radius: 5px;
  padding: 10px;
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 15px;
  border: none;
`;

export const TextOptionItem = styled.Text`
  color: ${({ color }: ContainerProps) => color || colors.lightOrange};
`;