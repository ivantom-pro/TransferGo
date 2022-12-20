import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native"

// navigation
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

export default function App() {

  return (
      <NavigationContainer>
        <AuthStack/>
        {/* <AppStack */}
      </NavigationContainer>
    );
}