import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView, Platform } from "react-native";

import ProfilScreen from "../screens/ProfilScreen";
import TransferScreen from "../screens/TransferScreen";
import SettingScreen from "../screens/SettingScreen";
import AccountScreen from "../screens/AccountScreen";
import HelpScreen from "../screens/HelpScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0, }}
        >
      <NavigationContainer>
        
        <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: '#2137B2'}}>
        <Tab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              title: "Profil",
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-circle" color={'#2137B2'} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Transaction"
            component={TransferScreen}
            options={{
              title: "Transaction",
              tabBarLabel: "Transaction",

              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="attach-money" color={'#2137B2'} size={size} />
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
                <MaterialIcons name="comment-bank" color={'#2137B2'} size={size} />
              ),
            }}
          />

          <Tab.Screen 
            name="Settings"
            component={SettingScreen}
            options={{
                title: "Settings",
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size}) => (
                    <MaterialIcons name="settings" color={'#2137B2'} size={size} />
                )
            }}
          />
                    <Tab.Screen
            name="Help"
            component={HelpScreen}
            options={{
              title: "Help",
              tabBarLabel: "Help",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="help" color={'#2137B2'} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </SafeAreaView>    
    </>
  );
}
