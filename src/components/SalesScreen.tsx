import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getSalesData, addSale } from '@/mockApi'; // Import the addSale function
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal } from 'react-native';


const SalesScreen = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSale, setNewSale] = useState({
    id: '',
    name: '',
    amount: '',
    date: '',
    customer: '',
  });
  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);

  // Fetch sales data on mount
  useEffect(() => {
    const fetchSalesData = async () => {
      const sales = await getSalesData();
      setSalesData(sales);
    };
    fetchSalesData();
  }, []);

  const renderSaleItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.customerName}>{item.name}</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => handleToggleDetails(item.id)} // Toggle accordion on click
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>

      {expandedSaleId === item.id && (
        <View style={styles.accordionContent}>
          <Text>Name: {item.name}</Text>
          <Text>Amount: ₹{item.amount.toFixed(2)}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Customer: {item.customer}</Text>
        </View>
      )}
    </View>
  );

  const handleToggleDetails = (id: string) => {
    if (expandedSaleId === id) {
      setExpandedSaleId(null); // Collapse if the same item is clicked
    } else {
      setExpandedSaleId(id); // Expand the clicked item
    }
  };

  const handleAddProduct = () => {
    const { name, amount, date, customer } = newSale;
    if (!name || !amount || !date || !customer) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newSaleEntry = {
      id: String(new Date().getTime()), // Unique ID based on timestamp
      name,
      amount: parseFloat(amount),
      date,
      customer,
    };

    // Update the salesData state with the new sale immediately
    setSalesData((prevSalesData) => [...prevSalesData, newSaleEntry]);

    // Call the addSale function to persist the new sale
    addSale(newSaleEntry)
      .then(() => {
        setModalVisible(false);
        setNewSale({ id: '', name: '', amount: '', date: '', customer: '' });
        Alert.alert('Success', 'Sale added successfully');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add sale');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>Sales :</Text>
      <FlatList
        data={salesData}
        keyExtractor={(item) => item.id}
        renderItem={renderSaleItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        <Text style={styles.addProductButtonText}>Add Product</Text>
      </TouchableOpacity>

      {/* Modal to Add New Sale */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Sale</Text>

            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newSale.name}
              onChangeText={(text) => setNewSale({ ...newSale, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (₹)"
              keyboardType="numeric"
              value={newSale.amount}
              onChangeText={(text) => setNewSale({ ...newSale, amount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newSale.date}
              onChangeText={(text) => setNewSale({ ...newSale, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              value={newSale.customer}
              onChangeText={(text) => setNewSale({ ...newSale, customer: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.addLeadButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addLead} onPress={handleAddProduct}>
                <Text style={styles.addLeadButtonText}>Add Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#edf7f6',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4cbf50', // Green color for the amount
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  viewDetailsButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  accordionContent: {
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    lineHeight: 20,
    borderTopColor: '#ddd',
  },
  addProductButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 15,
    elevation: 5,
  },
  addProductButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancel: {
    color: '#fff',
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  addLeadButtonText: {
    color: '#fff',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  addLead: {
    color: '#28a745',
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
