import React, { useState, useEffect } from "react";
import { Text, View, Modal, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
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

    const newLead = {
      id: String(new Date().getTime()),  // Generate a unique ID based on current timestamp
      name: leadName,
      status: leadStatus,
      contactInfo: leadContactInfo,
      dateCreated: leadDateCreated,
    };

    await addLead(newLead);  // Call the function to add the new lead

    // Close modal and reset form fields
    setModalVisible(false);
    setLeadName("");
    setLeadStatus("");
    setLeadContactInfo("");
    setLeadDateCreated("");

    // Fetch updated leads data
    const updatedLeads = await getLeadsData();
    setLeadsData(updatedLeads);
  };

  return (
    <View style={styles.container}>

       <Text style={{fontSize:25, marginBottom:10}}>Leads : </Text> 
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
      <TouchableOpacity style={styles.addLeadButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addLeadButtonText}>Add Lead</Text>
      </TouchableOpacity>

      {/* Modal to Add Lead */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Lead</Text>

          <TextInput
            placeholder="Lead Name"
            value={leadName}
            onChangeText={setLeadName}
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
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Add Lead" onPress={handleAddLead} />
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
  addLeadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addLeadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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
  },
});

export default LeadsScreen;
