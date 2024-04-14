// ItemList.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar os ícones do Expo
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ id, name, quantity, purchased ,onDeleteItem, onPurchased }) => {
  const navigation = useNavigation();
  const handleDeleteItem = () => {
    // Chama a função onDeleteItem passando o ID do item como argumento
    onDeleteItem(id);
  };

  const handlePurchasedItem = () => {
    onPurchased(id);
  };

  const handleItemPress = () => {
    navigation.navigate('AddItemScreen', { itemId: id });
  };

  return (
    <View style={styles.rowContainer}>   
      <TouchableOpacity style={purchased ? styles.PurchasedContainer : styles.NotPurchasedContainer} onPress={handlePurchasedItem}>
        <Ionicons name="checkmark" size={24} style ={ purchased ? styles.colorCheck : styles.colorNotCheck}  />
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={handleItemPress}>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
          </TouchableOpacity>
      </View>    

      <TouchableOpacity style={styles.deleteContainer} onPress={handleDeleteItem}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10, // Ajuste na altura das divs
  },
  contentContainer: {
    flexDirection: 'row', // Alteração aqui para organizar os textos lado a lado
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  deleteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10, // Ajuste na altura das divs
  },
  PurchasedContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10, // Ajuste na altura das divs
    marginRight : 5,
    color: '#ffffff',
    backgroundColor: 'green'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  NotPurchasedContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10, // Ajuste na altura das divs
    marginRight : 5,
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  colorCheck:{
    color: '#ffffff',
  },
  colorNotCheck:{
    color: '#000000',
  }
});

export default ItemList;
