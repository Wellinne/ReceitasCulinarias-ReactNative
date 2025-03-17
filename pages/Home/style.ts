import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 60px 0 0 0;
`;

export const Titulo = styled.Text`
  font-size: 30px;
  color: ${colors.roxo};
  font-weight: bold;
  align-self: center;
  text-align: center;
`;

export const Categoria = styled.Text`
  font-size: 16px;
  color: ${colors.lilas};
  align-self: center;
`;

export const SubTitulos = styled.Text`
  font-size: 20px;
  color: ${colors.roxo};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Descricao = styled.Text`
  font-size: 16px;
  color: ${colors.bege};
  margin-bottom: 10px;
`;