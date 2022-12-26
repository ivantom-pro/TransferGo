import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfilScreen from "../screens/ProfilScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen 
          component={StartScreen} 
          name="StartScreen" 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          component={LoginScreen}
          name="Login"
        />
        <Stack.Screen 
          component={RegisterScreen} 
          name="Register" 
        />
      </Stack.Navigator>
    );
};

export default AuthStack;



