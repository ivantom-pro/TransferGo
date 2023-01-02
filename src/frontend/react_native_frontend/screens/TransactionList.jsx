import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import List from "../components/List";
import EmptyList from "./EmtyList";

const TransactionList = ({navigation}) => {
    const {userTransactionList} = useContext(AuthContext);
    return (
        <View>
            <Header label={"Account"} {...navigation} />
            {userTransactionList.length == 0 ? <EmptyList/> : <List />}
        </View>
    )
}

export default TransactionList;
