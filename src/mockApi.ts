// src/api/mockApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const getUsers = async () => {
  const storedUsers = await AsyncStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const registerUser = async (email: string, password: string) => {
  const users = await getUsers();
  const existingUser = users.find((user: { email: string }) => user.email === email);

  if (existingUser) {
    Alert.alert('Error', 'Email already exists');
    // throw new Error('Email already exists');/

  }

  users.push({ email, password });
  await AsyncStorage.setItem('users', JSON.stringify(users));
};

export const getRegisteredUsers = async () => {
  const storedUsers = await AsyncStorage.getItem('users');
  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    console.log(users); // Log the users to the console
    return users;
  }
  return []; // If no users are stored
};

export const setLoggedInUser = async (user: { email: string; password: string }) => {
  await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const loginUser = async (email: string, password: string) => {
  const users = await getUsers();  // Retrieve the list of registered users
  console.log('Registered Users:', users);  // Log the users to the console

  const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Proceed with successful login (e.g., save logged-in user)
  await setLoggedInUser(user);
  return user;  // Return the logged-in user
};

export const getSalesData = async () => {


  return [
    { id: '1', name: 'Project X', amount: 2500, date: '2023-07-15', customer: 'John Doe' },
    { id: '2', name: 'Service Package', amount: 4200, date: '2023-07-14', customer: 'Jane Smith' },
  ];
};

export const getLeadsData = async () => {
  return [
    { id: '1', name: 'Acme Corp', status: 'Hot', contact: 'bob@acme.com' },
    { id: '2', name: 'Globex', status: 'Warm', contact: 'alice@globex.com' },
  ];
};

export const addSale = async (newSale: { id: string, name: string, amount: number, date: string, customer: string }) => {
  const sales = await getSalesData();
  sales.push(newSale);  // Add the new sale entry to the sales array
  await AsyncStorage.setItem('sales', JSON.stringify(sales));  // Store the updated sales data
};

// Dynamically push new lead data to the leads array
export const addLead = async (newLead: { id: string, name: string, status: string, contact: string }) => {
  const leads = await getLeadsData();
  leads.push(newLead);  // Add the new lead entry to the leads array
  await AsyncStorage.setItem('leads', JSON.stringify(leads));  // Store the updated leads data
};


// const SalesData = async () => {
//   const SalesData = {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//   };

//   try {
//     await AsyncStorage.setItem('user', JSON.stringify(user));  // Convert the object to a string before saving
//     console.log('Data saved!');
//   } catch (e) {
//     console.error('Failed to save data', e);
//   }
// };
