import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { InputSelect, Menu, Swiper } from '../../components';
import { Categoria, Container, Descricao, SubTitulos, Titulo } from './style';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

type Receita = {
  id: number;
  nome: string;
  receita: string;
  ingredientes: string;
  modo_preparo: string;
  link_imagem: string;
  tipo: string;
  created_at: string;
  IngredientesBase: any[];
};

const Home: React.FC = () => {
  const [receitaSelecionada, setReceitaSelecionada] = useState<number>(1);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [categoria, setCategoria] = useState<string>('todas');

  const formatarModoPreparo = (modoPreparo: string) => {
    return modoPreparo.replace(/(\d+\.)/g, (match, p1, offset) =>
      offset === 0 ? p1 : `\n${p1}`
    );
  };

  const todasReceitas = async () => {
    await axios.get('https://api-receitas-pi.vercel.app/receitas/todas')
      .then((response) => {
        setReceitas(response.data);
      }
    );
  };

  const tipoReceitas = async () => {
    await axios.get(`https://api-receitas-pi.vercel.app/receitas/tipo/${categoria}`)
      .then((response) => {
        setReceitas(response.data);
        setReceitaSelecionada(response.data[0].id);
      }
    );
  };

  useEffect(() => {
    todasReceitas();
  }, [todasReceitas.length, categoria === 'todas']);

  useEffect(() => {
    if(categoria !== 'todas') {
    tipoReceitas();
    }
  }, [categoria]);

  return (
    <Menu title="Home">
    <ScrollView>
      <Container>
        <InputSelect
          placeholder='Filtrar por categoria'
          options={['todas', 'salgado', 'doce']}
          onSelect={(categoria) => {
            setCategoria(categoria);
          }}
        />
        <Swiper data={receitas} onChange={setReceitaSelecionada}/>
        {receitas?.map((receita, index) => (
          receitaSelecionada === receita?.id &&
          <View key={Number(index)} style={{ padding: 14 }}>
            <Titulo>{receita.receita}</Titulo>
            <Categoria>{receita.tipo.toLocaleUpperCase()}</Categoria>
            <SubTitulos>Ingredientes</SubTitulos>
            <Descricao>{receita.ingredientes.split(',').map(item => item.trim()).join('\n')}</Descricao>
            <SubTitulos>Modo de Preparo</SubTitulos>
            <Descricao>{formatarModoPreparo(receita.modo_preparo)}</Descricao>
          </View>
        ))}
      </Container>
    </ScrollView>
    </Menu>
  );
};

export default Home;
