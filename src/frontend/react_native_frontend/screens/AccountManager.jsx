import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import Password from "./Password";
import TransactionList from "./TransactionList";

const Stack = createNativeStackNavigator();
const Accountmanager = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          component={AccountScreen} 
          name="Account2" 
          options={{headerShown:false}}
        />  
        <Stack.Screen 
          component={Password} 
          name="Password" 
          options={{headerShown:false}}
        />    
        <Stack.Screen 
          component={TransactionList} 
          name="TransactionList" 
          options={{headerShown:false}}
        />          
      </Stack.Navigator>
    );
};

export default Accountmanager;



