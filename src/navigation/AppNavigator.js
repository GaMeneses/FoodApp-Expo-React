import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import InitialScreen from '../screens/InitialScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
