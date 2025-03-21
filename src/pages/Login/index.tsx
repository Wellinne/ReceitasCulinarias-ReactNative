import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, InputText } from '../../components';
import { Container, Titulo } from './style';
import { colors } from '../../themes/colors';
import { caracterCustomizado } from '../../utils/inputMasks';
import { useAuth } from '../../contexts/Auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigation();
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      if (
        email === ''
        || email === null
        || password === ''
        || password === null
      ) {
        Alert.alert(
          'Preencha todos os dados',
          'Assegure-se de preencher todos os dados.',
          [{ text: 'OK' }],
        );
        return;
      } else {
        login(email, password);
      }
    } catch (error) {
      Alert.alert(
        'Dados incorretos',
        'Assegure-se de preencher todos os dados corretamente.',
        [{ text: 'OK' }],
      );
    }
  };

  return (
    <Container>
      <Titulo>LOGIN</Titulo>

      <InputText
        name="Email"
        placeholder="Email"
        value={email}
        onChange={(text: string) => setEmail(caracterCustomizado(text.toLowerCase().trim(), 100))}
        keyboardType="email-address"
      />

      <InputText
        name="Senha"
        placeholder="********"
        value={caracterCustomizado(password, 100)}
        onChange={setPassword}
        keyboardType="default"
        password
      />

      <View style={{ width: '100%', marginBottom: '5%' }}>
        <Button
          backgroundColor={colors.orange}
          label="Entrar"
          textColor={colors.white}
          height="50px"
          centered
          bold
          onClick={handleSubmit}
        />
      </View>
      
      <View style={{ width: '100%', marginBottom: '5%' }}>
        <Button
          backgroundColor="none"
          label="Cadastre-se"
          textColor={colors.orange}
          height="50px"
          bold
          centered
          variant="outlined"
          borderColor={colors.orange}
          onClick={() => navigator.navigate('Cadastro' as never)}
        />
      </View>
    </Container>
  );
};

export default Login;
