import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfileScreen = ({ navigation }: any) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Simulating fetching user data
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUser");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedInUser");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Unable to log out");
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={require('../assets/images/user.png')} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status: </Text>
                <View style={styles.statusDot}></View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
            <MaterialCommunityIcons name="logout" size={20} color="#fff" style={styles.logoutIcon} />
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    marginTop: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#888",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  logoutIcon: {
    marginLeft: 10,
  },
});

export default ProfileScreen;
