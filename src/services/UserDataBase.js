import * as SQLite from 'expo-sqlite'; 
import { hashPassword, generateSalt } from '../Helpers/Crypto';
import db from '../services/DataBase';

class Database {
  constructor() {
    // // Chamada durante a inicialização do banco de dados
    this.initDatabase(); 
  }

  initDatabase() {
    // Executar a criação da tabela de usuários
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, salt TEXT NOT NULL)',
        [],
        () => {
          console.log('Tabela de usuários criada com sucesso.');
        },
        (_, error) => {
          console.error('Erro ao criar tabela de usuários:', error);
        }
      );
    });
  }

  async getUserByEmailOrUsername(emailOrUsername) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? OR username = ?',
          [emailOrUsername, emailOrUsername],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0)); // Retorna o usuário com os campos salt e hash
            } else {
              resolve(null); // Retorna null se o usuário não for encontrado
            }
          },
          error => {
            reject(error); // Rejeita a promessa em caso de erro na consulta
          }
        );
      });
    });
  }

  async createUser(username, email, password, salt) {
    try {     
      const hashedPassword = await hashPassword(password, salt); // Obter o hash da senha   
      const result = await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              'INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)',
              [username, email, hashedPassword, salt], // Passar o salt para a consulta SQL
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  resolve(true); // Retorna true se o usuário foi criado com sucesso
                } else {
                  reject(new Error('Nenhum usuário foi criado.')); // Rejeita se nenhum usuário foi criado
                }
              },
              (_, error) => {
                reject(error); // Rejeita em caso de erro na execução da consulta SQL
              }
            );
          },
          error => {
            console.error('Erro na transação do banco de dados:', error);
            reject(error); // Rejeita em caso de erro na transação do banco de dados
          }
        );
      });
      return true; // Usuário criado com sucesso
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return false; // Erro ao criar usuário
    }
  }



  async getUsers() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        console.log('Iniciando transação SQL...');
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, { rows }) => {
            resolve(rows._array); // Retorna todos os usuários como um array
          },
          (_, error) => {
            reject(error); // Rejeita a promessa em caso de erro na consulta
          }
        );
      });
    });
  }

}


export default Database;
