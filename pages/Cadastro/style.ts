/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
`;

export const PasswordText = styled.Text`
  font-size: 13px;
  color: gray;
  align-self: flex-start;
  margin-left: 10px;
`;

export const Titulo = styled.Text`
  font-size: 30px;
  color: ${colors.roxo};
  font-weight: bold;
  margin: 20px 0;
`;