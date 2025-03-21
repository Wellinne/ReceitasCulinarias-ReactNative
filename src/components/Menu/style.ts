import styled from "styled-components/native";
import { colors } from "../../themes/colors";

export const Container = styled.View`
  flex: 1;
`;

export const Titulo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

export const MenuButton = styled.TouchableOpacity`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 40px 0 4px 8px;
  z-index: 1;
  background-color: ${colors.cinzaClaro};
`;

export const MenuButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.orange};
  font-weight: bold;
`;

export const Content = styled.View`
  flex: 1;
  padding-top: 20px;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 10px 20px;
`;

export const MenuText = styled.Text`
  color: ${colors.lightOrange};
  font-size: 18px;
`;