import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SalesScreen from "@/components/SalesScreen";
import LeadsScreen from "@/components/LeadsScreen";
import ProfileScreen from "@/components/ProfileScreen"; // Fix the name of ProfileScreen
import { StyleSheet, View, Text, Image } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5', // Active tab color
        tabBarInactiveTintColor: '#6B7280', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 70, // Adjust height for better spacing
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
          borderRadius: 20, // Rounded corners
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      {/* Sales Tab */}
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeTab : null}>
              <MaterialCommunityIcons
                name={focused ? 'chart-box' : 'chart-box-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      
      {/* Centered Logo Tab */}
      {/* <Tab.Screen
        name="Logo"
        component={ProfileScreen} // Create a temporary screen for the logo
        options={{
          tabBarIcon: ({ focused,color }) => (
            <View style={focused ? styles.activeTab : null}>
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
          tabBarLabel: () => null, // Hide the label for the logo
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            // Handle logo press (optional)
          },
        })}
      /> */}
      
      {/* Leads Tab */}
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeTab : null}>
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeTab : null}>
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#EEF2FF',
    padding: 8,
    borderRadius: 16,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomTabs;
