import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";

import InputField from "../components/InputField";

const DoTransfer = ({navigation}) => {
    return(
        <View>
            <Header label={"Transfer To"} {...navigation} />
            <View style={styles.inputField}>
                <Text>Enter amount</Text>
                <TextInput 
                    placeholder="Amount"
                />                
            </View>
            <View style={styles.inputField}>
                <Text>Enter type</Text>
                <TextInput 
                    placeholder="Type"
                />                
            </View>
            <View style={styles.inputField}>
                <Text>Enter Recipient number</Text>
                <TextInput 
                    placeholder="Number"
                />                
            </View>
            <View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:"#fff", fontSize:"24"}}>Transfer</Text>    
                </TouchableOpacity>               
            </View>

        </View>
    );
}

export default DoTransfer;

const styles = StyleSheet.create({
    inputField: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderColor: "#ccc", 
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        margin: 10,
        marginBottom: 5,
        backgroundColor: '#ccc'
    },
    btn: {
        alignItems: 'center', 
        justifyContent: 'center',
        borderColor: "#ccc", 
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        margin: 10,
        marginBottom: 5,
        backgroundColor: '#2137B2'
    },
  })