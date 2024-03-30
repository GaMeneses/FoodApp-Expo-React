// InitialScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FloatingBar from '../screens/Components/FloatingBar';
import ItemList from '../screens/Components/ItemList';
import ShoppingListController from '../controllers/ShoppingListController';
import AuthController from '../controllers/AuthController';
import CustomAlertModal from '../screens/Components/CustomAlert'; // Importe o modal personalizado corretamente

// Instância dos controladores
const shoppController = new ShoppingListController();
const authController = new AuthController();

const InitialScreen = () => {
  // Estados
  const [shoppingList, setShoppingList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShoppingList, setFilteredShoppingList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Função para obter o usuário logado
  const getCurrentUser = async () => {
    try {
      const currentUser = await authController.getCurrentUser();
      return currentUser;
    } catch (error) {
      console.error('Erro ao obter usuário logado:', error);
      return null;
    }
  };

  // Carregar a lista de compras
  const loadShoppingList = async () => {
    try {
      if (isFocused) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUserId(currentUser.id);
          const items = await shoppController.getAllItems(currentUser.id);
          setShoppingList(items);
          setFilteredShoppingList(items);
        } else {
          console.log('Nenhum usuário logado.');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar lista de compras:', error);
    }
  };

  // Efeito para atualizar o estado de foco da tela
  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  // Efeito para carregar a lista de compras quando a tela estiver focada
  useEffect(() => {
    if (isFocused) {
      loadShoppingList();
    }
  }, [isFocused]);

  // Função para lidar com a mudança na pesquisa
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredItems = shoppingList.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredShoppingList(filteredItems.length > 0 ? filteredItems : shoppingList);
  };

  // Função para editar um item
  const handleEditItem = (itemId) => {
    console.log('Editar item com ID:', itemId);
  };

  // Função para excluir um item
  const handleDeleteItem = async (itemId) => {
    try {
      await shoppController.removeItem(itemId);
      await loadShoppingList();
    } catch (error) {
      console.error('Erro ao excluir o item:', error);
    }
  };

  // Função para marcar um item como comprado
  const handleMarkAsPurchased = async (itemId) => {
    try {
      await shoppController.markAsPurchased(itemId);
      await loadShoppingList();
    } catch (error) {
      console.error('Erro ao marcar o item como comprado:', error);
    }
  };

  // Função para marcar um item como não comprado
  const handleMarkAsNotPurchased = async (itemId) => {
    try {
      await shoppController.markAsNotPurchased(itemId);
      await loadShoppingList();
    } catch (error) {
      console.error('Erro ao marcar o item como não comprado:', error);
    }
  };

  // Função para lidar com a exclusão de todos os itens
  const handleDeleteAllItems = async () => {
    setShowModal(true);
  };

  // Função para confirmar a exclusão de todos os itens
  const confirmDeleteAllItems = async () => {
    try {
      await shoppController.clearList(userId);
      await loadShoppingList();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao excluir todos os itens:', error);
    }
  };

  // Função para cancelar a exclusão de todos os itens
  const cancelDeleteAllItems = () => {
    setShowModal(false);
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
            renderItem={({ item }) => (
              <ItemList
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                purchased={item.purchased}
                isBought={item.isBought} // Passando o estado "isBought" do item
                onDeleteItem={handleDeleteItem}
                onEditItem={handleEditItem}
                onMarkAsPurchased={handleMarkAsPurchased} // Passando o método para marcar como comprado
                onMarkAsNotPurchased={handleMarkAsNotPurchased} // Passando o método para marcar como não comprado,
                onPurchased={item.purchased ? handleMarkAsNotPurchased : handleMarkAsPurchased}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.columnHeader}>Descrição</Text>
                <Text style={styles.columnHeader}>Quantidade</Text>
              </View>
            }
            ListFooterComponent={
              filteredShoppingList.length > 0 && (
                <View style={styles.footer}>
                  <Button
                    title="Remover Todos" 
                    onPress={handleDeleteAllItems}
                    color='#2A7F62'
                  />
                </View>
              )
            }
          />
        </SafeAreaView>
      </View>
      <FloatingBar />

      <CustomAlertModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onResult={(result) => {
          if (result) {
            // Se o resultado for true, o usuário confirmou
            confirmDeleteAllItems();
          } else {
            // Se o resultado for false, o usuário cancelou
            cancelDeleteAllItems();
          }
        }}
        title="Confirmar Remoção"
        message="Tem certeza que deseja remover todos os itens da lista?"
        showCancel // Adicionado para mostrar o botão "Cancelar"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d8dfdd'
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
  footer: {
    marginTop: 20,
    alignItems: 'center', 
  }
});

export default InitialScreen;
