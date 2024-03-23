import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect aqui
import FloatingBar from '../screens/Components/FloatingBar';
import ItemList from '../screens/Components/ItemList';
import ShoppingListController from '../controllers/ShoppingListController';

const shoppController = new ShoppingListController();

const InitialScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);

  const loadShoppingList = async () => {
    try {
      const items = await shoppController.getAllItems();
      setShoppingList(items);
    } catch (error) {
      console.error('Erro ao carregar lista de compras:', error);
    }
  };

  // Use useFocusEffect para recarregar a lista sempre que a tela for focada
  useFocusEffect(() => {
    loadShoppingList();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View>
        <SafeAreaView>
          <FlatList
            data={shoppingList}
            renderItem={({ item }) => <ItemList id={item.id} name={item.name} quantity={item.quantity} />}
            keyExtractor={(item) => item.id.toString()} // Convertendo para string
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
