import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import  { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

const RegisterScreen = ({navigation}) => {

    return (
      <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0, }}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 25}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
              <View style={styles.icon}>
                <Text style={{fontSize: 128, transform: [{rotate: '-15deg'}]}}>TF</Text>
              </View>      
            </View>
            <View>
              <Text style={styles.loginText}>Register</Text>
            </View>

            <InputField 
              label={'UserName'}
              icon={
                <MaterialIcons 
                  name="account-circle"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
            />

            <InputField 
              label={'Email'}
              icon={
                <MaterialIcons 
                  name="email"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="email-address"
            />

            <InputField 
              label={'Password'}
              icon={
                <MaterialIcons 
                  name="lock"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              inputType="password"
            />
            <InputField 
              label={'Confirm Password'}
              icon={
                <MaterialIcons 
                  name="lock"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              inputType="password"
            />

            <View style={styles.inputField}>
              <MaterialIcons 
                name="email"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={{color: "#ccc", marginLeft: 5}}>Date of birth</Text>
              </TouchableOpacity>
            </View>


            <CustomButton label={"Register"} onPress={() => {}} />

            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
              <Text>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.dummyText}>Login</Text>
              </TouchableOpacity>              
            </View>


          </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RegisterScreen
  
  
  const styles = StyleSheet.create({

    icon: {
      width: 200, 
      height: 200,
      backgroundColor: '#2137B2',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      borderRadius: 10
    },
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
    loginButton: {
      backgroundColor: '#2137B2',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      marginTop: 20
    },
    login: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      color: "#fff"
    }
  })