import { generateSalt, verifyPassword } from '../Helpers/Crypto';
import Database from '../services/UserDataBase'; // Importe a classe Database
import AsyncStorage from '@react-native-async-storage/async-storage';

const database = new Database();

class AuthController {

  async handleLogin(model) {
    try {
      // Obter o usuário pelo e-mail ou nome de usuário
      const user = await database.getUserByEmailOrUsername(model.email);
      if (!user) {
        console.log('Usuário não encontrado');
        return false; // Retorna falso se o usuário não for encontrado
      }
      // Verificar se a senha fornecida pelo usuário corresponde ao hash armazenado no banco de dados
      const isPasswordValid = await verifyPassword(model.password, user.password, user.salt);
      if (!isPasswordValid) {
        console.log('Senha incorreta');
        return false; // Retorna falso se a senha estiver incorreta
      }
      model.id = user.id;
        // Após o login bem-sucedido, define o usuário atual no AsyncStorage
        this.setCurrentUser(model); // Armazena o usuário atual

      console.log('Usuário autenticado:', model.email);
      return true; // Usuário autenticado com sucesso
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      return false; // Retorna falso em caso de erro ao autenticar o usuário
    }
  }
   
  // Função para criar um novo usuário com senha criptografada
  async createUser(username, email, password) {
    try {
      const salt = await generateSalt(16); // Gerar um salt aleatório
      await database.createUser(username, email, password, salt);
      console.log('Usuário criado com sucesso:', email);
      return true; // Usuário criado com sucesso
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return false; // Erro ao criar usuário
    }
  }

  async getUsers(model) {
    try {
      
      const users = await database.getUsers();
      
      console.log('users:', users);
      return true; // Usuário autenticado com sucesso
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      return false; // Erro ao autenticar usuário
    }
  }

  async getCurrentUser() {
    try {
      const userJson = await AsyncStorage.getItem('currentUser');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Erro ao recuperar usuário atual:', error);
      return null;
    }
  }

  async setCurrentUser(user) {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao definir usuário atual:', error);
    }
  }

  async clearCurrentUser() {
    try {
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Erro ao limpar usuário atual:', error);
    }
  }
}

export default AuthController;
