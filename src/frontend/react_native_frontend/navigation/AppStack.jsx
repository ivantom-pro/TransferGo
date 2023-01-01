import { SafeAreaView, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomDrawer from "../components/CustomDrawer";
import SettingScreen from "../screens/SettingScreen";
import HelpScreen from "../screens/HelpScreen";
import TabNavigator from "./TabNavigation";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0}}
        >
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
          screenOptions={{
          headerShown: false, 
          drawerActiveBackgroundColor: "#2137B2",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#555",
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 15
            }}}>
          <Drawer.Screen name="Profile" component={TabNavigator} options={{
            drawerIcon: ({color}) => (
              <MaterialIcons name="account-circle" size={22} color={color} />
            )
          }} />
          <Drawer.Screen name="Settings" component={SettingScreen} options={{
            drawerIcon: ({color}) => (
              <MaterialIcons name="settings" size={22} color={color} />
            )          
          }} />
          <Drawer.Screen name="Help" component={HelpScreen} options={{
            drawerIcon: ({color}) => (
              <MaterialIcons name="help" size={22} color={color} />
            )          
          }} />
        </Drawer.Navigator>
      </SafeAreaView>    
    </>
  );
}
