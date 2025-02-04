
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSalesData, getLeadsData, addSale } from '../mockApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Sale {
  id: string;
  name: string;
  date: string;
  customer: string;
  amount: number;
}

interface Lead {
  id: string;
  name: string;
  status: string;
  contact: string;
}

const LoggedInScreen = ({ navigation }: { navigation: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSale, setNewSale] = useState({
    name: '',
    amount: '',
    customer: '',
    date: '',
  });

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        const email = JSON.parse(user).email;
        const username = email.split('@')[0];
        setLoggedInUser(username);
      }
    };

    fetchLoggedInUser();

    const loadData = async () => {
      const salesData = await getSalesData();
      const leadsData = await getLeadsData();
      setSales(salesData);
      setLeads(leadsData);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.navigate('Home');
  };

  const handleAddSale = async () => {
    if (newSale.name && newSale.amount && newSale.customer && newSale.date) {
      const saleId = (sales.length + 1).toString();
      const sale = { ...newSale, id: saleId, amount: parseFloat(newSale.amount) };
      await addSale(sale);
      setSales((prevSales) => [...prevSales, sale]);
      setIsModalVisible(false); // Close the modal after adding the sale
      setNewSale({ name: '', amount: '', customer: '', date: '' }); // Reset form
    } else {
      alert('Please fill in all fields');
    }
  };

  const SalesLeadItem = ({ item }: { item: Sale }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemSubtitle}>{item.date}</Text>
      <Text style={styles.itemAmount}>${item.amount}</Text>
    </View>
  );

  const LeadItem = ({ item }: { item: Lead }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={[styles.itemSubtitle, item.status === 'Hot' ? styles.hotStatus : null]}>
        {item.status}
      </Text>
      <Text style={styles.itemSubtitle}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Modern Logout Button at Top Right Corner */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome, {loggedInUser}</Text>

      {/* Button to open modal for adding sales data */}
      <TouchableOpacity
        style={styles.addSaleButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addSaleButtonText}>Add Sale</Text>
      </TouchableOpacity>

      {/* Modal to input new sales data */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Sale Data</Text>
          <TextInput
            style={styles.input}
            placeholder="Sale Name"
            value={newSale.name}
            onChangeText={(text) => setNewSale({ ...newSale, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={newSale.amount}
            keyboardType="numeric"
            onChangeText={(text) => setNewSale({ ...newSale, amount: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Customer Name"
            value={newSale.customer}
            onChangeText={(text) => setNewSale({ ...newSale, customer: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={newSale.date}
            onChangeText={(text) => setNewSale({ ...newSale, date: text })}
          />
          <Button title="Add Sale" onPress={handleAddSale} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Sales Data</Text>
        <FlatList
          data={sales}
          keyExtractor={(item) => item.id}
          renderItem={SalesLeadItem}
          style={styles.list}
        />

        <Text style={styles.sectionTitle}>Leads Data</Text>
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={LeadItem}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logoutButton: {
    position: 'absolute',
    top: 25,
    right: 24,
    zIndex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 50,
    padding: 12,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  addSaleButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addSaleButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  input: {
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  itemAmount: {
    fontSize: 16,
    color: '#4F46E5',
    marginTop: 6,
  },
  hotStatus: {
    color: 'red',
  },
});

export default LoggedInScreen;

