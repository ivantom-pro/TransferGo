import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";

const TransferScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Transaction"} {...navigation} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Recharge account</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate('DoTransfer')}}>
                <Text style={styles.txt}>Money transfer</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Recharge airtime</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Buy internet bundles</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
};

export default TransferScreen;

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2137B2',
        color: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      },
    txt: {
        color: "white",
    }
});