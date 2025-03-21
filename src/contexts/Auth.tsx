import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useContext, FC, ReactNode, useEffect } from 'react';
import { User } from '../pages/Cadastro';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigator = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userLogado');
        console.log('Usuário logado:', savedUser);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Erro ao recuperar o usuário do AsyncStorage:', e);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Usuário:', email, 'Senha:', password);

    try {
      const usersArray = await AsyncStorage.getItem('cadastro');
      console.log('Usuários cadastrados:', usersArray);

      const listUsers = JSON.parse(usersArray || '[]');

      if (listUsers?.length === 0) {
        Alert.alert('Não há usuários cadastrados', '', [{ text: 'OK' }]);
        return;
      }

      const userLogged = listUsers?.find((user: User) => user.email === email && user.password === password);
  
      if (userLogged === undefined) {
        Alert.alert('Usuário não encontrado', 'Verifique se o e-mail e senha estão corretos.', [{ text: 'OK' }]);
        return;
      } else {
        setUser(userLogged);
        await AsyncStorage.setItem('userLogado', JSON.stringify(userLogged));
        navigator.navigate('Home' as never);
      }
    } catch (e) {
      console.error('Erro ao obter dados do AsyncStorage para usuários cadastrados:', e);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userLogado');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
