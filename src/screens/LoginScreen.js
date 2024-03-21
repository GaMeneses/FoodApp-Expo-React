import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone do AntDesign
import AuthModel from '../models/AuthModel';
import AuthController from '../controllers/AuthController';

const model = new AuthModel();
const controller = new AuthController();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false); // Estado para controlar se o login falhou
  const navigation = useNavigation();

  const handleLogin = async () => {
    model.setEmail(email);
    model.setPassword(password);
    const success = await controller.handleLogin(model); // Aguarde a conclusão do login
    if (success) {
      navigation.navigate('InitialScreen');
    } else {
      setLoginFailed(true); // Define loginFailed como true se o login falhou
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/foodapp_logo.png')}
        style={styles.logo}
      />
      {loginFailed && ( // Renderiza o texto apenas se o login falhar
        <Text style={styles.errorMessage}>Invalid username or password</Text>
      )}
      <View style={styles.inputContainer}>
        <AntDesign name="mail" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>
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
    width: '80%', // Ajuste para ocupar 80% da largura
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#2A7F62',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  createAccountText: {
    marginTop: 10,
    color: 'green',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginScreen;
