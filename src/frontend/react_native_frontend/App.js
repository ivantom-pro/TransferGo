import { StatusBar } from "expo-status-bar";
import React from "react";
import AppNav from './navigation/AppNav';
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
      <StatusBar barStyle="default" />
    </AuthProvider>    
    );
}