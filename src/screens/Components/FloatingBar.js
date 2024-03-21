import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone do AntDesign

const FloatingBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="user" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, // Margem inferior para afastar da parte inferior da tela
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
    alignItems: 'center', // Alinha a view ao meio verticalmente
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    paddingHorizontal: 5, // Espaçamento entre os botões
    backgroundColor: '#999',
    borderRadius: 30, // Aumenta o valor do borderRadius
    overflow: 'hidden', // Para garantir que os botões não ultrapassem as bordas arredondadas
    justifyContent: 'space-around', // Distribui os botões igualmente no espaço disponível
    alignItems: 'center', // Alinha os botões ao centro verticalmente
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A7F62',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingBar;
