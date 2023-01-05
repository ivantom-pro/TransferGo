import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";

const SettingScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Settings"} {...navigation} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Language</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Navigation tutorial</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>App info</Text>
                <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}

export default SettingScreen;

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
})