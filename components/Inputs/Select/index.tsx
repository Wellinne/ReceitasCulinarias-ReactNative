import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Container, DropdownButton, DropdownList, ModalOverlay, OptionItem, TextOptionItem } from './style';
import { colors } from '../../../themes/colors';

type InputProps = {
  options: string[]; 
  onSelect: (item:  string ) => void; 
  placeholder?: string;
};

const InputSelect = ({ options, onSelect, placeholder = "Selecione uma opção" }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsVisible(false);
  };

  return (
    <Container>
      <DropdownButton onPress={() => setIsVisible(true)}>
        <TextOptionItem color={colors.white}>
          {placeholder}
        </TextOptionItem>
      </DropdownButton>

      <Modal visible={isVisible} transparent animationType="fade">
        <ModalOverlay
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <DropdownList>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <OptionItem onPress={() => handleSelect(item)}>
                  <TextOptionItem>{item.toUpperCase()}</TextOptionItem>
                </OptionItem>
              )}
            />
          </DropdownList>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

export default InputSelect;