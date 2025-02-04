
// import React, { useState, useEffect } from 'react';
// import { Alert,View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// // Define Sales and Leads interfaces
// interface Sale {
//   id: string;
//   name: string;
//   date: string;
//   customer: string;
//   amount: number;
// }

// interface Lead {
//   id: string;
//   name: string;
//   status: string;
//   contact: string;
// }

// const Tab = createBottomTabNavigator();

// const SalesScreen = ({ sales, setIsModalVisible, isModalVisible, newSale, setNewSale, handleAddSale }: any) => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Sales</Text>
//     <FlatList
//       data={sales}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={styles.item}>
//           <Text style={styles.itemTitle}>{item.name}</Text>
//           <Text style={styles.itemText}>${item.amount}</Text>
//         </View>
//       )}
//     />
//     <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
//       <Text style={styles.addButtonText}>Add Sale</Text>
//     </TouchableOpacity>
//     <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
//       <View style={styles.modalContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Sale Name"
//           value={newSale.name}
//           onChangeText={(text) => setNewSale({ ...newSale, name: text })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Amount"
//           value={newSale.amount}
//           keyboardType="numeric"
//           onChangeText={(text) => setNewSale({ ...newSale, amount: text })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Customer Name"
//           value={newSale.customer}
//           onChangeText={(text) => setNewSale({ ...newSale, customer: text })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Date"
//           value={newSale.date}
//           onChangeText={(text) => setNewSale({ ...newSale, date: text })}
//         />
//         <Button title="Add Sale" onPress={handleAddSale} />
//       </View>
//     </Modal>
//   </View>
// );

// const LeadsScreen = ({ leads }: any) => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Leads</Text>
//     <FlatList
//       data={leads}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={styles.item}>
//           <Text style={styles.itemTitle}>{item.name}</Text>
//           <Text style={styles.itemText}>{item.status}</Text>
//         </View>
//       )}
//     />
//   </View>
// );

// const ProfileScreen = ({ loggedInUser }: any) => {

//   const navigation:any = useNavigation();

//   const handleLogout = async () => {

//     console.log('Logged out');  

//     Alert.alert(
//       'Log Out',
//       'Are you sure you want to log out?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'OK', onPress: async () => {
//           await AsyncStorage.removeItem('loggedInUser');
//           navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
//         }},
//       ]
//     );
//   };

//   return (
//   <View style={styles.container}>
//     <Text style={styles.title}>Profile</Text>
//     <Text style={styles.itemText}>Welcome, {loggedInUser}</Text>
//     <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//       <MaterialCommunityIcons name="logout" size={24} color="white" />
//     </TouchableOpacity>
    
//   </View>
//   )
// };

// const LoggedInScreen = ({ navigation }: { navigation: any }) => {
//   const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
//   const [sales, setSales] = useState<Sale[]>([]);
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [newSale, setNewSale] = useState({
//     name: '',
//     amount: '',
//     customer: '',
//     date: '',
//   });

//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       const user = await AsyncStorage.getItem('loggedInUser');
//       if (user) {
//         const email = JSON.parse(user).email;
//         setLoggedInUser(email.split('@')[0]);
//       }
//     };

//     const loadData = async () => {
//       setSales([/* Example sales data */]);
//       setLeads([/* Example leads data */]);
//     };

//     fetchLoggedInUser();
//     loadData();
//   }, []);

//   // const handleLogout = async () => {
//   //   await AsyncStorage.removeItem('loggedInUser');
//   //   // navigation.navigate('Home');
//   //   // console.log('Logged out');

//   //   navigation.reset({
//   //     index: 0,
//   //     routes: [{ name: 'Home' }],
//   //   });
    
//   //   console.log('Logged out');

//   // };

 
  

//   const handleAddSale = async () => {
//     const saleId = (sales.length + 1).toString();
//     const sale = { ...newSale, id: saleId, amount: parseFloat(newSale.amount) };
//     setSales([...sales, sale]);
//     setIsModalVisible(false);
//   };

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Sales" children={() => <SalesScreen sales={sales} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} newSale={newSale} setNewSale={setNewSale} handleAddSale={handleAddSale} />} />
//       <Tab.Screen name="Leads" children={() => <LeadsScreen leads={leads} />} />
//       <Tab.Screen name="Profile" children={() => <ProfileScreen loggedInUser={loggedInUser}  />} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#F9FAFB',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 16,
//   },
//   addButton: {
//     backgroundColor: '#4F46E5',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   addButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   item: {
//     padding: 16,
//     backgroundColor: '#fff',
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   logoutButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: '#EF4444',
//     padding: 12,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingLeft: 12,
//   },
//   modalContainer: {
//     padding: 16,
//   },
// });

// export default LoggedInScreen;

import React, { useState } from 'react';
import { Alert,View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ensure the user is authenticated, then navigate to the bottom tab navigator
const LoggedInScreen = ({ navigation }: { navigation: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simulate successful login logic
    setIsAuthenticated(true);

    // After successful login, navigate to the Bottom Tabs
    if (isAuthenticated) {
      navigation.navigate('Tabs'); // This will trigger the BottomTabs navigation
    }
  };

    const handleLogout = async () => {

    console.log('Logged out');  

    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: async () => {
          await AsyncStorage.removeItem('loggedInUser');
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }},
      ]
    );
  };

  return (
    <View>
      <Text>Logged In Screen</Text>
      <Button title="Log In" onPress={handleLogin} />

      <Text>Logout </Text>
      <Button title="Log In" onPress={handleLogout} />
    </View>
  );
};

export default LoggedInScreen;
