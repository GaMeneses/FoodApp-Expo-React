import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FloatingBar from '../screens/Components/FloatingBar'; // Importe o FloatingBar aqui

const InitialScreen = () => {
  // Dados fictícios para a lista de itens
  const shoppingList = [
    { id: '1', name: 'Maçãs', quantity: '5 kg' },
    { id: '2', name: 'Bananas', quantity: '1 dúzia' },
    { id: '3', name: 'Leite', quantity: '2 litros' },
    { id: '4', name: 'Pão', quantity: '1 pacote' },
    { id: '5', name: 'Arroz', quantity: '1 kg' },
    { id: '6', name: 'Feijão', quantity: '500 g' },
    { id: '7', name: 'Feijão', quantity: '500 g' },
    { id: '8', name: 'Feijão', quantity: '500 g' },
    { id: '9', name: 'Feijão', quantity: '500 g' },
    { id: '10', name: 'Feijão', quantity: '500 g' },
  ];

  // Função para renderizar cada item da lista de compras
  const renderShoppingItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>    
      <View>
        <FlatList
          data={shoppingList}
          renderItem={renderShoppingItem}
          keyExtractor={item => item.id}
        />
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
});

export default InitialScreen;
