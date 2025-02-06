import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getLeadsData, addLead } from "@/mockApi"; // Import the new addLead function

const LeadsScreen = () => {
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadContactInfo, setLeadContactInfo] = useState("");
  const [leadDateCreated, setLeadDateCreated] = useState("");

  useEffect(() => {
    const fetchLeadsData = async () => {
      const leads = await getLeadsData();
      setLeadsData(leads);
    };
    fetchLeadsData();
  }, []);

  const handleAddLead = async () => {
    if (!leadName || !leadStatus || !leadContactInfo || !leadDateCreated) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newLeadEntry = {
      id: String(new Date().getTime()), // Generate a unique ID based on current timestamp
      name: leadName,
      status: leadStatus,
      contactInfo: leadContactInfo,
      dateCreated: leadDateCreated,
    };

    // Add the new lead to the leadsData array directly for immediate update
    setLeadsData((prevLeadsData) => [...prevLeadsData, newLeadEntry]);

    // Call the addLead function to persist the new lead
    try {
      await addLead(newLeadEntry); // Call the API to persist the lead
      setModalVisible(false);
      setLeadName("");
      setLeadStatus("");
      setLeadContactInfo("");
      setLeadDateCreated("");
      Alert.alert("Success", "Lead added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add Lead");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>Leads :</Text>
      {/* Leads List */}
      {leadsData.map((lead) => (
        <View key={lead.id} style={styles.leadItem}>
          <Text style={styles.leadName}>{lead.name}</Text>
          <Text>Status: {lead.status}</Text>
          <Text>Contact: {lead.contactInfo}</Text>
          <Text>Date Created: {lead.dateCreated}</Text>
        </View>
      ))}

      {/* Add Lead Button */}
      <TouchableOpacity
        style={styles.addLeadButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        <Text style={styles.addLeadButtonText}>Add Leads</Text>
      </TouchableOpacity>

      {/* Modal to Add Lead */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Lead</Text>

            <TextInput
              placeholder="Lead Name"
              value={leadName}
              onChangeText={setLeadName} // Update leadName directly
              style={styles.input}
            />
            <TextInput
              placeholder="Lead Status"
              value={leadStatus}
              onChangeText={setLeadStatus}
              style={styles.input}
            />
            <TextInput
              placeholder="Contact Info"
              value={leadContactInfo}
              onChangeText={setLeadContactInfo}
              style={styles.input}
            />
            <TextInput
              placeholder="Date Created"
              value={leadDateCreated}
              onChangeText={setLeadDateCreated}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancle}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.addLeadButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addLead} onPress={handleAddLead}>
                <Text style={styles.addLeadButtonText}>Add Leads</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  leadItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leadName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addLeadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 15,
    elevation: 5,
  },
  addLeadButtonText: {
    color: "#fff",
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancle: {
    color: "#fff",
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  addLead: {
    color: "#28a745",
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default LeadsScreen;
