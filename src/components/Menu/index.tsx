import React, { useRef, useState } from 'react';
import { Container, Content, MenuButton, MenuButtonText, MenuItem, MenuText } from './style';
import { StyleSheet, Animated } from 'react-native';
import { colors } from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';

type MenuProps = {
  children: React.ReactNode;
  title?: string;
};

const Menu = ({ children, title }: MenuProps) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigator = useNavigation();

  const toggleMenu = (page?: string) => {
    const toValue = isMenuOpen ? -300 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsMenuOpen(!isMenuOpen);

    if(page) {
      navigator.navigate(page as never)
    }
  };

  return (
    <Container>
      <MenuButton onPress={() => toggleMenu()}>
        <MenuButtonText>☰</MenuButtonText>
        <MenuButtonText>{title}</MenuButtonText>
      </MenuButton>

      <Content>{children}</Content>

      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <MenuItem onPress={() => toggleMenu('Home')}>
          <MenuText>Home</MenuText>
        </MenuItem>
        <MenuItem onPress={() => toggleMenu('Perfil')}>
          <MenuText>Perfil</MenuText>
        </MenuItem>
        <MenuItem onPress={() => toggleMenu('Login')}>
          <MenuText>Sair</MenuText>
        </MenuItem>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: colors.white,
    paddingTop: 80,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
});

export default Menu;