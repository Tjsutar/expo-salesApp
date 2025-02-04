// // // App.tsx
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import SignInScreen from './src/screens/SignInScreen';
// // import SignUpScreen from './src/screens/SignUpScreen';
// // import LoggedInScreen from './src/screens/LoggedInScreen';

// // const Stack = createStackNavigator();

// // const App = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Home">
// //         <Stack.Screen name="Home" component={SignInScreen} options={{headerShown:false}}/>
// //         <Stack.Screen name="Register" component={SignUpScreen} options={{headerShown:false}} />
// //         <Stack.Screen name="LoggedIn" component={LoggedInScreen} options={{headerShown:false}}/>
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// // export default App;



// import React from 'react';

// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SignInScreen from './src/screens/SignInScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
// import LoggedInScreen from './src/screens/LoggedInScreen';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Create a Stack Navigator for the authentication flow
// const Stack = createStackNavigator();

// // Create a Bottom Tab Navigator for the logged-in user
// const Tab = createBottomTabNavigator();

// const SalesScreen = () => {
//   // Sales screen component content goes here
//   return <View><Text>Sales Screen</Text></View>;
// };

// const LeadsScreen = () => {
//   // Leads screen component content goes here
//   return <View><Text>Leads Screen</Text></View>;
// };

// const ProfileScreen = () => {
//   // Profile screen component content goes here
//   return <View><Text>Profile Screen</Text></View>;
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={SignInScreen} 
//           options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//           name="Register" 
//           component={SignUpScreen} 
//           options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//           name="LoggedIn" 
//           component={LoggedInScreen} 
//           options={{ headerShown: false }} 
//         />
//         {/* Add a screen for the Bottom Tab Navigation */}
//         <Stack.Screen 
//           name="Tabs" 
//           component={BottomTabs} 
//           options={{ headerShown: false }} 
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// // BottomTab navigator for the logged-in user screens
// const BottomTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Sales"
//         component={SalesScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Leads"
//         component={LeadsScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account-group-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default App;



import React from 'react';
import { Alert,View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoggedInScreen from './src/screens/LoggedInScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Create a Stack Navigator for the authentication flow
const Stack = createStackNavigator();

// Create a Bottom Tab Navigator for the logged-in user
const Tab = createBottomTabNavigator();

// Sales screen component
const SalesScreen = () => {
  return (
    <View>
      <Text>Sales Screen</Text>
    </View>
  );
};

// Leads screen component
const LeadsScreen = () => {
  return (
    <View>
      <Text>Leads Screen</Text>
    </View>
  );
};

// Profile screen component
const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};

// BottomTab navigator for the logged-in user screens
const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Authentication flow */}
        <Stack.Screen
          name="Home"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
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
        {/* Add a screen for the Bottom Tab Navigation */}
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
