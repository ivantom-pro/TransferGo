import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const Password = ({navigation}) => {
    const [old_password, setPassword] = useState(null);
    const [new_password, setNew_password] = useState(null);
    const [confirm_password, setConfirm_password] = useState(null);
    const {changePassword} = useContext(AuthContext);
    const change = (old_password, new_password, confirm_password) => {
        if(new_password == confirm_password) {
            changePassword(old_password, new_password, confirm_password)
        }else {
            alert("Verify the new password fields are equal");
        }
    }
    return(
        <View>
            <Header label={"Change password"} {...navigation} />
            <View style={styles.inputField}>
                <Text>Current password</Text>
                <TextInput 
                    placeholder="current password"
                    value={old_password}
                    onChangeText={text => setPassword(text)}
                />                
            </View>
            <View style={styles.inputField}>
                <Text>New password</Text>
                <TextInput 
                    placeholder="new password"
                    value={new_password}
                    onChangeText={text => setNew_password(text)}
                />                
            </View>
            <View style={styles.inputField}>
                <Text>Confirm new password</Text>
                <TextInput 
                    placeholder="confirm new password"
                    value={confirm_password}
                    onChangeText={text => setConfirm_password(text)}
                />                
            </View>
            <View>
                <TouchableOpacity style={styles.btn} onPress={() => {change(old_password, new_password, confirm_password)}}>
                    <Text style={{color:"#fff", fontSize:"24"}}>Confirm</Text>    
                </TouchableOpacity>               
            </View>

        </View>
    );
}

export default Password;

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