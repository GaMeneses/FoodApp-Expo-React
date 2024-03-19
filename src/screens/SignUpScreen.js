import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AuthModel from '../models/AuthModel';
import AuthController from '../controllers/AuthController';

const model = new AuthModel();
const controller = new AuthController();


const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    model.setUsername(username);
    model.setEmail(email);
    model.setPassword(password);
    const success = await controller.createUser(username, email, password);
    if (success) {
      console.log('Usuário criado com sucesso.');
      // Aqui você pode navegar para outra tela, talvez a tela de login
    } else {
      console.log('Erro ao criar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/foodapp_logo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
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
});

export default SignUpScreen;
