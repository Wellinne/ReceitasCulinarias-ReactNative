import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, InputText } from '../../components';
import { Container, PasswordText, Titulo } from './style';
import { caracterCustomizado } from '../../utils/inputMasks';
import { colors } from '../../themes/colors';
import { ScrollView } from 'react-native-gesture-handler';

interface User {
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

  const [firstColor, setFirstColor] = useState<string>('gray');
  const [scndColor, setScndColor] = useState<string>('gray');
  const [thrdColor, setThrdColor] = useState<string>('gray');
  const [fourthColor, setFourthColor] = useState<string>('gray');
  const [fifthColor, setFifthColor] = useState<string>('gray');

  useEffect(() => {
    if (/(?=.*[a-z])[a-z]/.test(userData.password) && userData?.password?.length > 0) {
      setFirstColor(colors.green);
    }

    if (/(?=.*[A-Z])[A-Z]/.test(userData.password)) {
      setScndColor(colors.green);
    }

    if (/(?=.*[0-9])[0-9]/.test(userData.password)) {
      setThrdColor(colors.green);
    }

    if (/(?=.*[$*&@#?!+%.])[$*&@#?!+%.]/.test(userData.password)) {
      setFourthColor(colors.green);
    }

    if (userData?.password?.length >= 8) {
      setFifthColor(colors.green);
    }
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
          <PasswordText style={{ color: fifthColor }}>8 caractéres</PasswordText>
          {' '}
          {'\n'}
          <PasswordText style={{ color: firstColor }}>Uma letra minúscula</PasswordText>
          {' '}
          {'\n'}
          <PasswordText style={{ color: scndColor }}>Uma letra maiúscula</PasswordText>
          {' '}
          {'\n'}
          <PasswordText style={{ color: thrdColor }}>Um número</PasswordText>
          {' '}
          {'\n'}
          <PasswordText style={{ color: fourthColor }}>Um caractér especial</PasswordText>
        </PasswordText>

        <View style={{ width: '100%', marginTop: '10%' }}>
          <Button
            backgroundColor={colors.roxo}
            height="50px"
            textColor="white"
            centered
            label="Cadastrar"
            bold
            onClick={async () => {
              const approved = checkFields();
              if (approved) {
                navigator.navigate('Login' as never)                 
              }
            }}
          />
        </View>
        <View style={{ width: '100%', marginTop: '5%' }}>
          <Button
            backgroundColor="none"
            label="Voltar"
            textColor={colors.roxo}
            height="50px"
            bold
            centered
            variant="outlined"
            borderColor={colors.roxo}
            onClick={() => navigator.navigate('Login' as never)}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

export default Cadastro;
