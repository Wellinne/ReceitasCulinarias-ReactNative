import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Cadastro, Login } from '../pages';
import Perfil from '../pages/Perfil';

const { Navigator: PublicNavigator, Screen: PublicScreen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <PublicNavigator screenOptions={{ headerShown: false }}>
      <PublicScreen name="Perfil" component={Perfil} />
      <PublicScreen name="Login" component={Login} />
      <PublicScreen name="Cadastro" component={Cadastro} />
      <PublicScreen name="Home" component={Home} />
    </PublicNavigator>
  );
};

export default Routes;
