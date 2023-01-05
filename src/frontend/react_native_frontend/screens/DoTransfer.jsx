import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from 'react-native-select-dropdown'
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const DoTransfer = ({navigation}) => {
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState(null);
    const [number, setNumber] = useState(null);
    const {transfer} = useContext(AuthContext);
    const data = ["cash_in", "transfert", "withdraw"];
    const send = (amount, type, number) => {
        if(amount == null || type == null || number == null){
            alert("Fill the required fields");
        }else{
            transfer(amount, type, number)
            setAmount(null);
            setType(null);
            setNumber(null)
        }
    }

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
                <Text>Enter Recipient number</Text>
                <TextInput 
                    placeholder="Number"
                    value={number}
                    onChangeText={text => setNumber(text)}
                />                
            </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',}}>
                <View style={{
                    backgroundColor:"#ccc", 
                    padding: 25, 
                    margin: 10,
                    paddingRight: 10,
                    marginLeft: 20,
                    borderRadius: 10
                    }}>
                        <Text>Enter transaction type</Text>
                    </View>
                <SelectDropdown
                    data={data}var
                    onSelect={(selectedItem, index) => {
                        setType(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />   

            </View>

            <View>
                <TouchableOpacity style={styles.btn} onPress={() => {send(amount, type, number)}}>
                    <Text style={{color:"#fff", fontSize:"24"}}>Transfer</Text>    
                </TouchableOpacity>               
            </View>

            <View>
            
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