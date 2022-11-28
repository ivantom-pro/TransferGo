import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// navigation
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

export default function App() {

  return (
    //<AuthStack />
    <AppStack/>
    );
}