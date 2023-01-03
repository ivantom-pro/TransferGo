import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProfilScreen from "../screens/ProfilScreen";
import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";
import Transactions from "../screens/Transactions";
import Accountmanager from "../screens/AccountManager";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false, 
            tabBarActiveTintColor: '#2137B2',
            tabBarInactiveTintColor: '#555'
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
            component={Transactions}
            options={{
              title: "Transaction",
              tabBarLabel: "Transaction",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="attach-money" color={color} size={size} />
              ),
            }}
          />

        <Tab.Screen
            name="account"
            component={Accountmanager}
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