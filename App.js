import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Pantalla Principal' }}
        />
        <Stack.Screen 
          name="Calculator" 
          component={CalculatorScreen} 
          options={{ title: 'Calculadora Básica' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}