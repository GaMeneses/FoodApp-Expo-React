import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FloatingBar from '../screens/Components/FloatingBar';
import ItemList from '../screens/Components/ItemList';
import ShoppingListController from '../controllers/ShoppingListController';
import AuthController from '../controllers/AuthController'; // Importe a controller AuthController

const shoppController = new ShoppingListController();
const authController = new AuthController(); // Crie uma instância da AuthController

const InitialScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar se a tela está focada ou não
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShoppingList, setFilteredShoppingList] = useState([]); // Lista filtrada para exibição

  // Função para obter o usuário logado
  const getCurrentUser = async () => {
    try {
      const currentUser = await authController.getCurrentUser(); // Chame a função getCurrentUser da AuthController
      return currentUser; // Retorne o usuário logado
    } catch (error) {
      console.error('Erro ao obter usuário logado:', error);
      return null; // Retorne null em caso de erro
    }
  };

  const loadShoppingList = async () => {
    try {
      // Obter o usuário logado apenas se a tela estiver focada
      if (isFocused) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUserId(currentUser.id);
          // Carregar a lista de compras com base no ID do usuário logado
          const items = await shoppController.getAllItems(currentUser.id);
          setShoppingList(items);
          setFilteredShoppingList(items); // Inicialmente, a lista filtrada é igual à lista completa
        } else {
          console.log('Nenhum usuário logado.');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar lista de compras:', error);
    }
  };

  // Use useFocusEffect para atualizar o estado de foco da tela
  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  // Carregue a lista de compras apenas quando a tela estiver focada
  useEffect(() => {
    if (isFocused) {
      loadShoppingList();
    }
  }, [isFocused]);

  // Função para lidar com a mudança na pesquisa
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filtrar a lista de compras com base na pesquisa
    const filteredItems = shoppingList.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredShoppingList(filteredItems.length > 0 ? filteredItems : shoppingList); // Se a lista filtrada estiver vazia, exiba a lista completa
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por descrição..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View>
        <SafeAreaView>
          <FlatList
            data={filteredShoppingList}
            renderItem={({ item }) => <ItemList id={item.id} name={item.name} quantity={item.quantity} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.columnHeader}>Descrição</Text>
                <Text style={styles.columnHeader}>Quantidade</Text>
              </View>
            }
          />
        </SafeAreaView>
      </View>
      <FloatingBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  columnHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InitialScreen;
