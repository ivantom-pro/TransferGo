import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransferScreen from "../screens/TransferScreen";
import DoTransfer from "../screens/DoTransfer";

const Stack = createNativeStackNavigator();

const Transactions = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          component={TransferScreen} 
          name="Transaction2" 
          options={{headerShown:false}}
        />        
        <Stack.Screen 
          component={DoTransfer}
          name="DoTransfer"
          options={{headerShown:false}}
        />        
      </Stack.Navigator>
    );
};

export default Transactions;



