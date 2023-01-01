import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const TransactionList = ({navigation}) => {
    const {userTransactionList} = useContext(AuthContext);

    return (
        <View>
            <Header label={"Account"} {...navigation} />

            <Text>Hey</Text>
        </View>
    )
}

export default TransactionList;

const styles = StyleSheet.create({

})