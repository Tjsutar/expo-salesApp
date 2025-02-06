import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SalesScreen from "@/components/SalesScreen";
import LeadsScreen from "@/components/LeadsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import { StyleSheet, View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue', // Active tab color
        tabBarInactiveTintColor: '#6B7280', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 70, // Adjust height for better spacing
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 5,
          borderRadius: 20, // Rounded corners
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          marginTop: 1,
        },
        tabBarIconStyle: {
          // Add some scaling effect to the icon
          transform: [{ scale: 1.1 }],
        },
        tabBarHideOnKeyboard: true, // Hide the tab bar when the keyboard is open
        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {/* Sales Tab */}
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
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
      
      {/* Leads Tab */}
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color,focused }) => (
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
    borderRadius: 18,
    transform: [{ scale: 1.2 }], // Slight scaling effect for the active tab
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
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
