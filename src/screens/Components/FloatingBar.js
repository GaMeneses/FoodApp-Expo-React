import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FloatingBar = () => {
  const navigation = useNavigation();

  const handleAddItemPress = () => {
    navigation.navigate('AddItemScreen');
  };

  const handleHomePress = () => {
    navigation.navigate('InitialScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleHomePress}>
          <AntDesign name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddItemPress}>
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
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#999',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'center',
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
