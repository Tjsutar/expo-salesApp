
import React, { useState, useEffect } from 'react';
import { Alert, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoggedInScreen from './src/screens/LoggedInScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSalesData, getLeadsData, setLoggedInUser } from './src/mockApi';

const Stack = createStackNavigator();
// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      console.log("logged in user ",loggedInUser)
      if (loggedInUser) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoggedInStatus();
  }, []);

  // Handle user login
  const handleLogin = async (email: string, password: string) => {
    try {
      // Simulate user login
      const user = { email, password };
      await setLoggedInUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  // Show loading message until the check is complete
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'LoggedIn' : 'Home'}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {props => <SignInScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoggedIn"
          component={LoggedInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
