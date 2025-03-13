/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

type ContainerProps = {
  url: string;
};

export const SwiperStyled = styled.View`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const Container = styled.View`
  width: 90px;
  height: 90px;
  border: 2px solid ${colors.roxo};
  border-radius: 50%;
  padding: 0;
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ImageStyled = styled.Image`
  width: 100%;
  height: 100%;
`;