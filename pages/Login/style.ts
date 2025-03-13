import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
`;

export const Titulo = styled.Text`
  font-size: 30px;
  color: ${colors.roxo};
  font-weight: bold;
  margin-bottom: 20px;
`;