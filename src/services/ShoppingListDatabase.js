import * as SQLite from 'expo-sqlite';
import db from '../services/DataBase';

const databaseName = 'FoodApp.db';

class ShoppingListDatabase {
  constructor() {
      this.initDatabase();
  }

  initDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS shopping_list (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, quantity INTEGER NOT NULL, purchased INTEGER DEFAULT 0, user_id INTEGER NOT NULL)',
        [],
        () => {
          console.log('Tabela da lista de compras criada com sucesso.');
        },
        (_, error) => {
          console.error('Erro ao criar tabela da lista de compras:', error);
        }
      );
    });
  }
  
  async addItem(userId, name, quantity) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO shopping_list (user_id, name, quantity) VALUES (?, ?, ?)',
          [userId, name, quantity],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId); // Retorna o ID do item inserido
            } else {
              reject(new Error('Erro ao adicionar item à lista de compras.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
  

  async updateItem(id, newName, newQuantity) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE shopping_list SET name = ?, quantity = ? WHERE id = ?',
          [newName, newQuantity, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Item atualizado com sucesso
            } else {
              reject(new Error('Nenhum item foi atualizado.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async getItemById(itemId) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM shopping_list WHERE id = ?',
          [itemId],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0)); // Retorna o primeiro item encontrado
            } else {
              reject(new Error('Nenhum item encontrado com o ID fornecido.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async removeItem(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM shopping_list WHERE id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Item removido com sucesso
            } else {
              reject(new Error('Nenhum item foi removido.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async getAllItems() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM shopping_list',
          [],
          (_, { rows }) => {
            resolve(rows._array); // Retorna todos os itens como um array
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async markAsPurchased(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE shopping_list SET purchased = 1 WHERE id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Item marcado como comprado com sucesso
            } else {
              reject(new Error('Nenhum item foi marcado como comprado.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async markAsNotPurchased(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE shopping_list SET purchased = 0 WHERE id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Item marcado como não comprado com sucesso
            } else {
              reject(new Error('Nenhum item foi marcado como não comprado.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async clearList() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM shopping_list',
          [],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true); // Lista de compras limpa com sucesso
            } else {
              reject(new Error('Nenhum item foi removido da lista de compras.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  async getAllItemsByUserId(userId)  {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM shopping_list WHERE user_id = ?',
          [userId],
          (_, { rows }) => {
            resolve(rows._array); // Retorna todos os itens como um array
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
}

export default ShoppingListDatabase;
