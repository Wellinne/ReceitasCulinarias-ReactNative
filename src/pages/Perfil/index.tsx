import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, InputText, Menu } from '../../components';
import { Container } from './style';
import { caracterCustomizado } from '../../utils/inputMasks';
import { colors } from '../../themes/colors';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/Auth';
import { PasswordText } from '../Cadastro/style';

export interface User {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

const Perfil: React.FC = () => {
  const { user, setUser } = useAuth();
  const [editar, setEditar] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
  } as User);
  const [errorMessages, setErrorMessages] = useState<User>({} as User);
  
  const checkFields = (): boolean => {
    const {
      name, password, email,
    } = userData;

    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?!+%.])[0-9a-zA-Z$*&@#?!+%.]{8,}$/;

    const errors: User = {
      name: !name ? 'Digite o seu nome' : '',
      email: !regexEmail.test(email) ? 'Digite um e-mail válido' : '',
      password: !regexPassword.test(password) ? 'A senhas deve conter pelo menos: um dígito, uma letra minúscula, letra maiúscula, um caractere especial e ao menos 8 caracteres mencionados' : '',
    };
    setErrorMessages(errors);

    const failed = Object.values(errors).some((value) => value !== '');

    if (failed) {
      Alert.alert('Preencha os campos corretamente');
      return false;
    }

    return true;
  };
  
  const [verificacaoSenha, setVerificacaoSenha] = useState({
    maxCaracter: colors.cinzaEscuro,
    maiuscula: colors.cinzaEscuro,
    minuscula: colors.cinzaEscuro,
    numero: colors.cinzaEscuro,
    caractereEspecial: colors.cinzaEscuro,
  });

  const validarSenha = (senha: string) => {
    const regexMinuscula = /(?=.*[a-z])/;
    const regexMaiuscula = /(?=.*[A-Z])/;
    const regexNumero = /(?=.*[0-9])/;
    const regexCaractereEspecial = /(?=.*[$*&@#?!+%.])/;

    setVerificacaoSenha((prevState) => ({
      ...prevState,
      minuscula: senha?.length > 0 && regexMinuscula.test(senha) ? colors.green : colors.cinzaEscuro,
      maiuscula: senha?.length > 0 && regexMaiuscula.test(senha) ? colors.green : colors.cinzaEscuro,
      numero: senha?.length > 0 && regexNumero.test(senha) ? colors.green : colors.cinzaEscuro,
      caractereEspecial: senha?.length > 0 && regexCaractereEspecial.test(senha) ? colors.green : colors.cinzaEscuro,
      maxCaracter: senha?.length >= 8 ? colors.green : colors.cinzaEscuro,
    }));
  };
  
  useEffect(() => {
    validarSenha(userData.password);
  }, [userData.password]);

  const editarPerfil = async () => {
    if (editar) {
      if (checkFields()) {
        try {
          const savedUser = await AsyncStorage.getItem('userLogado');
          if (!savedUser) {
            Alert.alert('Usuário não encontrado', 'Por favor, faça login novamente.', [{ text: 'OK' }]);
            return;
          }
  
          const usersArray = await AsyncStorage.getItem('cadastro');
          const listUsers = JSON.parse(usersArray || '[]');
          
          const userLogged = listUsers?.find((dados: User) => dados.email === user?.email && dados.password === user.password);
          if (userLogged === undefined) {
            Alert.alert('Usuário não encontrado', 'Verifique se o email e senha estão corretos.', [{ text: 'OK' }]);
            return;
          } else {
            await AsyncStorage.setItem('userLogado', JSON.stringify(userData));
  
            const updatedUsersArray = listUsers.map((dados: User) => 
              dados.email === user?.email && dados.password === user.password ? { ...user, ...userData } : user
            );
            await AsyncStorage.setItem('cadastro', JSON.stringify(updatedUsersArray));
            setUser(userData);

            console.log('Usuário atualizado:', userData);
            Alert.alert('Perfil atualizado com sucesso!', '', [{ text: 'OK' }]);
          }
        } catch (e) {
          console.error('Erro ao atualizar os dados do perfil:', e);
          Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar o perfil. Tente novamente.', [{ text: 'OK' }]);
        }
      }
    }
    setEditar(!editar);
  }

  return (
    <Menu title="Perfil">
      <ScrollView>
        <Container>
          <InputText
            name="Nome"
            placeholder="Nome"
            value={userData.name}
            onChange={(text: string) => setUserData({ ...userData, name: caracterCustomizado(text, 50) })}
            keyboardType="default"
            desabled={editar}
            error={errorMessages.name}
          />
          
          <InputText
            name="Email"
            placeholder="Email"
            value={userData.email}
            onChange={(text: string) => setUserData({ ...userData, email: caracterCustomizado(text.toLowerCase().trim(), 100) })}
            keyboardType="default"
            desabled={editar}
            error={errorMessages.email}
          />
          
          <InputText
            name="Senha"
            placeholder="Senha"
            value={userData.password}
            onChange={(text: string) => setUserData({ ...userData, password: caracterCustomizado(text, 100) })}
            keyboardType="default"
            password
            desabled={editar}
            error={errorMessages.password || errorMessages.confirmPassword}
          />

          {editar && <PasswordText>
              A senha deve possuir:
              {' '}
              {'\n'}
              <PasswordText color={verificacaoSenha.maxCaracter}>8 caractéres</PasswordText>
              {' '}
              {'\n'}
              <PasswordText color={verificacaoSenha.minuscula}>Uma letra minúscula</PasswordText>
              {' '}
              {'\n'}
              <PasswordText color={verificacaoSenha.maiuscula}>Uma letra maiúscula</PasswordText>
              {' '}
              {'\n'}
              <PasswordText color={verificacaoSenha.numero}>Um número</PasswordText>
              {' '}
              {'\n'}
            <PasswordText color={verificacaoSenha.caractereEspecial}>Um caractér especial</PasswordText>
          </PasswordText>}

          <View style={{ width: 150, marginTop: '5%', alignSelf: 'center' }}>
            <Button
              backgroundColor={editar ? colors.orange : "none"}
              label={editar ? "Salvar" : "Editar" }
              textColor={editar ? colors.white : colors.orange}
              height="50px"
              bold
              centered
              variant="outlined"
              borderColor={colors.orange}
              onClick={() => editarPerfil()}
            />
          </View>
        </Container>
      </ScrollView>
    </Menu>
  );
};

export default Perfil;
