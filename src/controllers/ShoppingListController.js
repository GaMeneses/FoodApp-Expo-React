import ShoppingListDatabase from '../services/ShoppingListDatabase';
import ShoppingListItem from '../models/ShoppingListItem';

const dataBaseShoppingList = new ShoppingListDatabase();

class ShoppingListController {

  // Método para adicionar um item à lista de compras
  async addItem(userId, name, quantity) {
    try {
      // Lógica para adicionar um novo item associado ao usuário
      await dataBaseShoppingList.addItem(userId, name, quantity);
      console.log('Item adicionado com sucesso:', name);
      return true; // Item adicionado com sucesso
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      return false; // Erro ao adicionar item
    }
  }

  async updateItem(id, newName, newQuantity) {
    try {
      await dataBaseShoppingList.updateItem(id, newName, newQuantity);
    } catch (error) {
      console.error('Erro ao atualizar item da lista de compras:', error);
      throw error;
    }
  }

  // Método para remover um item da lista de compras
  async removeItem(id) {
    try {
      await dataBaseShoppingList.removeItem(id);
    } catch (error) {
      console.error('Erro ao remover item da lista de compras:', error);
      throw error;
    }
  }

  // Método para marcar um item como comprado
  async markAsPurchased(id) {
    try {
      await dataBaseShoppingList.markAsPurchased(id);
    } catch (error) {
      console.error('Erro ao marcar item como comprado:', error);
      throw error;
    }
  }

  // Método para desmarcar um item como comprado
  async markAsNotPurchased(id) {
    try {
      await dataBaseShoppingList.markAsNotPurchased(id);
    } catch (error) {
      console.error('Erro ao desmarcar item como comprado:', error);
      throw error;
    }
  }

  // Método para obter todos os itens da lista de compras
  async getAllItems() {
    try {
      const shoppingListItems = await dataBaseShoppingList.getAllItems();
      return shoppingListItems.map(item => {
        return new ShoppingListItem(item.id, item.name, item.quantity, item.purchased);
      });
    } catch (error) {
      console.error('Erro ao obter itens da lista de compras:', error);
      throw error;
    }
  }
  
  async getItemById(itemId) {
    try {
      const item = await dataBaseShoppingList.getItemById(itemId);
      return item;
    } catch (error) {
      console.error('Erro ao obter item por ID:', error);
      throw error;
    }
  }

  // Método para limpar a lista de compras
  async clearList() {
    try {
      await dataBaseShoppingList.clearList();
    } catch (error) {
      console.error('Erro ao limpar lista de compras:', error);
      throw error;
    }
  }

  async getAllItems(userId) {
    try {
      // Modifique esta função para carregar apenas os itens pertencentes ao usuário
      const items = await dataBaseShoppingList.getAllItemsByUserId(userId);
      return items;
    } catch (error) {
      console.error('Erro ao obter itens da lista de compras:', error);
      throw error;
    }
  }
}

export default ShoppingListController;
