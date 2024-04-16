import React, { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CEPDisplay = ({ data }) => {

  return (
    <View style={styles.container}>
      <Text>Logradouro: {data.logradouro}</Text>
        <Text>Bairro: {data.bairro}</Text>
        <Text>Cidade: {data.localidade}</Text>
        <Text>Estado: {data.uf}</Text>
        <Text>CEP: {data.cep}</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top: 150,
    backgroundColor: '#fff',
    padding: 10,
    left: 30
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    top: 35
  },
  texto: {
    fontSize: 16,
    color: 'red'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,

  },
  visibleButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CEPDisplay;