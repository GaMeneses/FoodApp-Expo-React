import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CEPInput = ({ onSearch }) => {
  const [cep, setCEP] = useState('');

  const handleSearch = () => {
    if (cep.length === 8) { // Verifica se o CEP tem o tamanho correto
      onSearch(cep);
    } else {
      Alert.alert('CEP inválido', 'Por favor, insira um CEP válido com 8 dígitos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={text => setCEP(text)}
          />
        </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch} >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>

    
  );

};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    width: 230
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    left: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
});


export default CEPInput;