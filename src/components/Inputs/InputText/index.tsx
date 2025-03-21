import { KeyboardTypeOptions } from 'react-native';
import { Container, ErrorText, Input,Text } from './style';

interface InputProps{
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  keyboardType: KeyboardTypeOptions;
  color?: string;
  password?: boolean;
  desabled?: boolean;
}

export function InputText({ name, placeholder, value, onChange, onBlur, error, keyboardType, color, password, desabled }: InputProps) {
 return (
  <Container>
    <Text color={color}>{name}</Text>
    <Input
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      secureTextEntry={password}
      editable={desabled}
    />
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
  );
}