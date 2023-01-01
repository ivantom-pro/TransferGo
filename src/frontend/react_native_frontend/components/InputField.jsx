import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function InputField({
  label, 
  icon, 
  inputType, 
  keyboardType, 
  fieldButtonLabel, 
  fieldButtonfunction,
  value,
  onChangeText,
}) {
    return (
        <View>
            <View style={styles.inputField}>
              {icon}
              {inputType == 'password' ? (
                <TextInput 
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={styles.inputText}
                    secureTextEntry={true}
                    value={value}
                    onChangeText={onChangeText}
                />                     
                ) : ( 
                <TextInput 
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={styles.inputText}
                    value={value}
                    onChangeText={onChangeText}
                /> 
                )}

            <TouchableOpacity onPress={() => {fieldButtonfunction}} style={styles.loginButton}>
              <Text style={styles.dummyText}>{fieldButtonLabel}</Text>
            </TouchableOpacity>             
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  inputField: {
    flexDirection: 'row', 
    borderBottomColor: "#ccc", 
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  inputText : {
    flex: 1, 
    paddingVertical: 0
  },
  dummyText: {
    color: "#2137B2", 
    fontWeight: '700'
  },
  login: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: "#fff"
  }
})