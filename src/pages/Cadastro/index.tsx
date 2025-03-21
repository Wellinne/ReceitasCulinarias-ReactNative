import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, InputText } from '../../components';
import { Container, PasswordText, Titulo } from './style';
import { caracterCustomizado } from '../../utils/inputMasks';
import { colors } from '../../themes/colors';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

const Cadastro: React.FC = () => {
  const navigator = useNavigation();
  const [userData, setUserData] = useState<User>({} as User);
  const [errorMessages, setErrorMessages] = useState<User>({} as User);

  const checkFields = (): boolean => {
    const {
      name, password, email, confirmPassword,
    } = userData;

    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?!+%.])[0-9a-zA-Z$*&@#?!+%.]{8,}$/;

    const errors: User = {
      name: !name ? 'Digite o seu nome' : '',
      email: !regexEmail.test(email) ? 'Digite um e-mail válido' : '',
      password: !regexPassword.test(password) ? 'A senhas deve conter pelo menos: um dígito, uma letra minúscula, letra maiúscula, um caractere especial e ao menos 8 caracteres mencionados' : '',
      confirmPassword: !confirmPassword || regexPassword.test(password) !== regexPassword.test(confirmPassword)? 'As senhas devem ser iguais' : '',
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

  return (
    <ScrollView>
      <Container>
        <Titulo>CADASTRE-SE</Titulo>

        <InputText
          name="Nome"
          placeholder="Nome"
          value={userData.name}
          onChange={(text: string) => setUserData({ ...userData, name: caracterCustomizado(text, 50) })}
          keyboardType="default"
          error={errorMessages.name}
        />

        <InputText
          name="Email"
          placeholder="Email"
          value={userData.email}
          onChange={(text: string) => setUserData({ ...userData, email: caracterCustomizado(text.toLowerCase().trim(), 100) })}
          keyboardType="default"
          error={errorMessages.email}
        />

        <InputText
          name="Senha"
          placeholder="Senha"
          value={userData.password}
          onChange={(text: string) => setUserData({ ...userData, password: caracterCustomizado(text, 100) })}
          keyboardType="default"
          password
          error={errorMessages.password || errorMessages.confirmPassword}
        />

        <InputText
          name="Confirmar Senha"
          placeholder="Confirmar Senha"
          value={userData.confirmPassword}
          onChange={(text: string) => setUserData({ ...userData, confirmPassword: caracterCustomizado(text, 100) })}
          keyboardType="default"
          password
          error={errorMessages.confirmPassword}
        />

        <PasswordText>
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
        </PasswordText>

        <View style={{ width: '100%', marginTop: '10%' }}>
          <Button
            backgroundColor={colors.orange}
            height="50px"
            textColor="white"
            centered
            label="Cadastrar"
            bold
            onClick={async () => {
              const approved = checkFields();
              if (approved) {
                try {
                  const usersString = await AsyncStorage.getItem('cadastro');
                  const usersArray = usersString ? JSON.parse(usersString) : [];
                  
                  usersArray.push(userData);
                  await AsyncStorage.setItem('cadastro', JSON.stringify(usersArray));

                  console.log('Usuário cadastrado com sucesso:', userData);

                  navigator.navigate('Login' as never);
                } catch (e) {
                  console.error('Erro ao salvar dados no AsyncStorage:', e);
                }       
              }
            }}
          />
        </View>
        <View style={{ width: '100%', marginTop: '5%' }}>
          <Button
            backgroundColor="none"
            label="Voltar"
            textColor={colors.orange}
            height="50px"
            bold
            centered
            variant="outlined"
            borderColor={colors.orange}
            onClick={() => navigator.navigate('Login' as never)}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

export default Cadastro;
