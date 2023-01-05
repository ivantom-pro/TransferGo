import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfilScreen from "./ProfilScreen";
import TransferScreen from "./TransferScreen";
import SettingScreen from "./SettingScreen";
import AccountScreen from "./AccountScreen";
import HelpScreen from "./HelpScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
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
              title: "Transaction",
              tabBarLabel: "Transaction",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="email" color={color} size={size} />
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
                <MaterialIcons name="email" color={color} size={size} />
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
                    <MaterialIcons name="settings" color={color} size={size} />
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
                <MaterialIcons name="account-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
