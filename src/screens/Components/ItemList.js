// ItemList.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ id, name, quantity }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    // Navegar para a tela de edição com o ID do item
    navigation.navigate('AddItemScreen', { itemId: id });
  };

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.quantity}>{quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
});

export default ItemList;
