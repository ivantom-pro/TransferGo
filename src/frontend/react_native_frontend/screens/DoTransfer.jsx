import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const DoTransfer = ({navigation}) => {
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState("cash_in");
    const [number, setNumber] = useState(null);
    const {transfer} = useContext(AuthContext);

    return(
        <View>
            <Header label={"Transfer To"} {...navigation} />
            <View style={styles.inputField}>
                <Text>Enter amount</Text>
                <TextInput 
                    placeholder="Amount"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />                
            </View>
            <View style={styles.inputField}>
                <Text>Enter type</Text>
                <TextInput 
                    placeholder="Type"
                    value={type}
                    onChangeText={text => setType(text)}
                />                
            </View>
            <View style={styles.inputField}>
                <Text>Enter Recipient number</Text>
                <TextInput 
                    placeholder="Number"
                    value={number}
                    onChangeText={text => setNumber(text)}
                />                
            </View>
            <View>
                <TouchableOpacity style={styles.btn} onPress={() => {transfer(amount, type, number)}}>
                    <Text style={{color:"#fff", fontSize:"24"}}>Transfer</Text>    
                </TouchableOpacity>               
            </View>
            <View>
                <Picker
                    
                    selectedValue={type}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                >
                    <Picker.Item label="cash_in" value="cash_in" />
                    <Picker.Item label="withdraw" value="withdraw" />
                    <Picker.Item label="transfert" value="transfert" />
                </Picker>
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