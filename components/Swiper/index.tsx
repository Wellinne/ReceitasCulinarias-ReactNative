import React from 'react';
import { FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Container, ImageStyled, SwiperStyled } from './style';
import { colors } from '../../themes/colors';

type SwiperProps = {
  data: any[];
  onChange: (text: number) => void;
};

const   Swiper: React.FC<SwiperProps> = ({ data, onChange }) => {
  const [idSelected, setIdSelected] = React.useState<number>(1);

  return (
    <SwiperStyled>
      <FlatList
        data={data}
        style={{ width: Dimensions.get('window').width }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {onChange(item.id); setIdSelected(item.id);}}>
            <Container select={item.id === idSelected ? `4px solid ${colors.roxo}` : `2px solid ${colors.roxo}`}>
              <ImageStyled source={{ uri: item.link_imagem }} />
            </Container>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SwiperStyled>
  );
};

export default Swiper;
