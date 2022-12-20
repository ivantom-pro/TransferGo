import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProfilScreen from "../screens/ProfilScreen";
import TransferScreen from "../screens/TransferScreen";
import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false, 
            tabBarActiveTintColor: '#2137B2',
            tabBarInactiveTintColor: '#ccc'
        }}>
        <Tab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              title: "Profil",
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-circle" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Transaction"
            component={TransferScreen}
            options={{
              title: "Transacti2137B2on",
              tabBarLabel: "Transaction",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="attach-money" color={color} size={size} />
              ),
            }}
          />

        <Tab.Screen
            name="account"
            component={AccountScreen}
            options={{
              title: "My Account",
              tabBarLabel: "Account",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="comment-bank" color={color} size={size} />
              ),
            }}
          />

        <Tab.Screen
            name="message"
            component={MessageScreen} 
            options={{
              tabBarBadge: 4,
              tarBarBadgeStyle: {backgroundColor: "#2137B2"},
              title: "Messages",
              tabBarLabel: "Message",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="message" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    );
}