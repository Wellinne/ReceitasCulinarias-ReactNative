import React from 'react';
import { FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Container, ImageStyled, SwiperStyled } from './style';

type SwiperProps = {
  data: any[];
  onChange: (text: number) => void;
};

const Swiper: React.FC<SwiperProps> = ({ data, onChange }) => {
  return (
    <SwiperStyled>
      <FlatList
        data={data}
        style={{ width: Dimensions.get('window').width }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(item.id)}>
            <Container>
              <ImageStyled source={{ uri: item.imagem }} />
            </Container>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SwiperStyled>
  );
};

export default Swiper;
