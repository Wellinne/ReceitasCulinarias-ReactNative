import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Swiper } from '../../components';
import { Categoria, Container, Descricao, SubTitulos, Titulo } from './style';
import { colors } from '../../themes/colors';
import Receitas from '../../mocks/Receitas.json';
import { ScrollView } from 'react-native-gesture-handler';

const Home: React.FC = () => {
  const [receitaSelecionada, setReceitaSelecionada] = useState<number>(1);
  const navigator = useNavigation();

  return (
    <ScrollView>
      <Container>
        <Swiper data={Receitas} onChange={setReceitaSelecionada}/>
        {Receitas.map((receita, index) => (
          receitaSelecionada === receita?.id &&
              <View key={Number(index)}>
                <Titulo>{receita.nome}</Titulo>
                <Categoria>{receita.categoria}</Categoria>
                <SubTitulos>Ingredientes</SubTitulos>
                {receita.ingredientes.map(((item, indexIngredientes) =>
                  <Descricao key={Number(indexIngredientes)}>{item}</Descricao>)
                )}
                <SubTitulos>Modo de preparo</SubTitulos>
                <Descricao>{receita.modoDePreparo}</Descricao>
                <SubTitulos>Tempo de preparo</SubTitulos>
                <Descricao>{receita.tempoDePreparo}</Descricao>
                <SubTitulos>Rendimento</SubTitulos>
                <Descricao>{receita.rendimento}</Descricao>
              </View>
        ))}
        
        <View style={{ width: '50%', marginBottom: '5%' }}>
          <Button
            backgroundColor={colors.roxo}
            label="Sair"
            textColor={colors.white}
            height="50px"
            bold
            centered
            variant="outlined"
            onClick={() => navigator.navigate('Login' as never)}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

export default Home;
