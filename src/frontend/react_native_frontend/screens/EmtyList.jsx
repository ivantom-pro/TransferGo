import React from "react";
import { View, Text } from "react-native";

const EmptyList = () => {
    return(
        <View style={{alignItems:'center', justifyContent:'center', paddingTop: 200}}>
            <Text>No transaction</Text>
        </View>
    )
}

export default EmptyList;