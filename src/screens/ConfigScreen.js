// ItemList.js
import React, {useState} from 'react';
import FloatingBar from '../screens/Components/FloatingBar';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthController from '../controllers/AuthController';
import axios from 'axios';
import CEPInput from '../screens/Components/CepInput';
import CEPDisplay from '../screens/Components/CepDisplay';

const controller = new AuthController();

const ConfigScreen = ({ id, name, quantity }) => {

  const navigation = useNavigation();
  
  const [cepData, setCEPData] = useState(null);

  const logout = async () => {

    try {

      const currentUser = await controller.getCurrentUser(); // Chame a função getCurrentUser da AuthController
      await controller.clearCurrentUser(currentUser);

      navigation.navigate('LoginScreen');
      
    } catch (error) {
      console.error('Erro ao obter usuário logado:', error);
    }
  };

  const fetchCEPData = async (cep) => {
    try {
      await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
        // Verifica se há um campo "erro" e se é verdadeiro
          if (response.data.erro === true) {
            Alert.alert('CEP não existe', 'Não foi possível encontrar o CEP informado.');  
          } else {
            // A requisição foi bem-sucedida, você pode acessar os dados retornados
            setCEPData(response.data);
          }
        })
        .catch(error => {
          // Se ocorrer um erro na requisição, você pode lidar com ele aqui
          Alert.alert('CEP inválido', 'O CEP informado é inválido ou não existe.');  
        });

    } catch (error) {
      console.error('Error fetching CEP data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CEPInput onSearch={fetchCEPData} />
        {cepData && <CEPDisplay data={cepData} />}
      <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <FloatingBar />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8dfdd'
  },
  logout: {
    position: 'absolute',
    bottom: 100,
    width: '50%',
    backgroundColor: '#F00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConfigScreen;
