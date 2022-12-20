import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";


const TransferScreen = () => {
    return (
        <View>
            <Header label={"Transaction"} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Recharge account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Money transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Recharge airtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Buy internet bundles</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TransferScreen;

const styles = StyleSheet.create({
    btn: {
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
})