import { SafeAreaView, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler';

import CustomDrawer from "../components/CustomDrawer";
import ProfilScreen from "../screens/ProfilScreen";
import TransferScreen from "../screens/TransferScreen";
import SettingScreen from "../screens/SettingScreen";
import AccountScreen from "../screens/AccountScreen";
import HelpScreen from "../screens/HelpScreen";

import TabNavigator from "./TabNavigation";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
    <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0, }}
        >
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Profile" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={SettingScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
      </Drawer.Navigator>

      </SafeAreaView>    
    </>
  );
}
