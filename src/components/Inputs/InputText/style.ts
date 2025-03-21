import styled from 'styled-components/native';
import { colors } from '../../../themes/colors';
import { TextInput } from 'react-native';

interface Props {
  color?: string;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Text = styled.Text`
  color: ${(props: Props) => (props.color ? props.color : colors.cinzaEscuro)};
  font-size: 16px;
  margin-bottom: 4px;
`;

export const Input = styled(TextInput)`
  background-color: ${colors.white};
  border-radius: 4px;
  padding: 12px;
`;

export const ErrorText = styled.Text`
  color: ${colors.red};
  margin-top: 4px;
  margin-left: 8px;
  font-size: 12px;
`;