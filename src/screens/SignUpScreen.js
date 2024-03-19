import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AuthModel from '../models/AuthModel';
import AuthController from '../controllers/AuthController';
import CustomAlertModal from '../screens/CustomAlert'; // Importe o novo componente

const model = new AuthModel();
const controller = new AuthController();

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setErrorAlertVisible(true);
      return;
    }

    model.setUsername(username);
    model.setEmail(email);
    model.setPassword(password);
    const success = await controller.createUser(username, email, password);
    if (success) {
      setSuccessAlertVisible(true);
      console.log('Usuário criado com sucesso.');
    } else {
      console.log('Erro ao criar usuário.');
    }
  };

  const closeSuccessAlert = () => {
    setSuccessAlertVisible(false);
    navigateToLogin(); // Navega para a tela de login após fechar o alerta de sucesso
  };

  const closeErrorAlert = () => {
    setErrorAlertVisible(false);
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/foodapp_logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="mail" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      {/* Renderizando o CustomAlertModal */}
      <CustomAlertModal
        visible={successAlertVisible || errorAlertVisible}
        onClose={successAlertVisible ? closeSuccessAlert : closeErrorAlert}
        title={successAlertVisible ? 'Sucesso' : 'Erro'}
        message={successAlertVisible ? 'Cadastro realizado com sucesso!' : 'Todos os campos são obrigatórios.'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8dfdd'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%', // Defina a largura da inputContainer para 80% da tela
  },
  inputIcon: {
    marginHorizontal: 10,
    width: 24, // Defina uma largura fixa para o ícone
  },
  input: {
    flex: 1, // Faça o input ocupar todo o espaço restante
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#2A7F62',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Adicionamos margem inferior para separar do botão de retorno
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#2A7F62',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
