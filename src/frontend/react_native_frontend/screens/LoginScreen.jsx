import React, { useContext, useState } from "react";
import { Platform, KeyboardAvoidingView, NativeModules } from 'react-native';
import  { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);  
    const {login} = useContext(AuthContext);
    return (
      <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0, }}
        >
          <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            enabled>
            <View style={{paddingHorizontal: 25}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.icon}>
                  <Text style={{fontSize: 128, transform: [{rotate: '-15deg'}]}}>TF</Text>
                </View>      
              </View>

              <View>
                <Text style={styles.loginText}>Login</Text>
              </View>

              <InputField 
                label={'User Name'}
                icon={
                  <MaterialIcons 
                    name="account-circle"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                keyboardType="username"
                value={username}
                onChangeText={text => setUsername(text)}
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
                fieldButtonLabel={"Forgot?"}
                fieldButtonfunction={() => {}}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <CustomButton label={"Login"} onPress={() => {
                if(username == null || password == null) {
                  alert("Either user name or password are incorrect, please verify and retry")
                }else {
                  login(username, password)
                }
              }}/>

              <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
                <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.dummyText}>Register</Text>
                </TouchableOpacity>              
              </View>

            </View>
          </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
  
  export default LoginScreen
  
  const styles = StyleSheet.create({
    icon: {
      width: 200, 
      height: 200,
      backgroundColor: '#2137B2',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      borderRadius: 10,
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