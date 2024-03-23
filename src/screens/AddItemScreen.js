import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShoppingListController from '../controllers/ShoppingListController';
import CustomAlertModal from '../screens/Components/CustomAlert'; 

const shoppingListController = new ShoppingListController();

const AddItemScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    // Verificar se estamos editando um item existente
    if (route.params?.itemId) {
      setIsEditing(true);
      setItemId(route.params.itemId);
      // Carregar os detalhes do item para edição
      loadItemDetails(route.params.itemId);
    }
  }, []);

  const loadItemDetails = async (itemId) => {
    try {
      const itemDetails = await shoppingListController.getItemById(itemId);
      setItemName(itemDetails.name);
      setItemQuantity(itemDetails.quantity.toString()); // Convertendo para string
    } catch (error) {
      console.error('Erro ao carregar detalhes do item:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      // Convertendo os valores para strings
      const itemNameString = itemName.toString();
      const itemQuantityString = itemQuantity.toString();
  
      // Verificar se estamos criando um novo item ou atualizando um existente
      if (isEditing) {
        // Lógica para atualizar o item existente
        await shoppingListController.updateItem(itemId, itemNameString, itemQuantityString);
      } else {
        // Lógica para adicionar um novo item
        await shoppingListController.addItem(itemNameString, itemQuantityString);
      }
      setShowSuccessModal(true);
      setItemName('');
      setItemQuantity('');
    } catch (error) {
      console.error('Erro ao adicionar/atualizar item:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigation.goBack(); // Voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Item' : 'Adicionar à Lista'}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            value={itemName}
            onChangeText={text => setItemName(text)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={itemQuantity}
            onChangeText={text => setItemQuantity(text)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button title={isEditing ? 'Atualizar Item' : 'Adicionar Item'} onPress={handleAddItem} />
      <CustomAlertModal
        visible={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="Sucesso"
        message={isEditing ? "Item atualizado com sucesso!" : "Item adicionado com sucesso!"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default AddItemScreen;
