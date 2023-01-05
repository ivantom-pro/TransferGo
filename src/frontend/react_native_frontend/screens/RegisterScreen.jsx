import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = ({navigation}) => {
  const {register} = useContext(AuthContext); 
  const [username, setUsername] = useState(null);
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [email, setEmail] = useState(null);
  const [adress, setAdress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [birthday, setBirthday] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedBirthday) => {
    const currentBirthday = selectedBirthday;
    setShow(false);
    setBirthday(currentBirthday);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const verifyPassword = (password1, password2, username, first_name, last_name, email, phone, birthday, adress)  => {
    if(password1 != null && password2 != null) {
      if(password1 === password2) {
        register(username, first_name, last_name, email, password1, phone, birthday.toLocaleDateString(), adress);
        navigation.goBack(); 
      }else {
        alert("Password do not match");
     }
    }else {
      alert("Some fields may be empty")
    }
  }
    return (
      <SafeAreaView 
        style={{ flex: 1,
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT :0, }}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 25}}>

          <KeyboardAvoidingView>

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
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <InputField 
              label={'FirstName'}
              icon={
                <MaterialIcons 
                  name="account-circle"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              value={first_name}
              onChangeText={text => setFirst_name(text)}
            />

            <InputField 
              label={'LastName'}
              icon={
                <MaterialIcons 
                  name="account-circle"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              value={last_name}
              onChangeText={text => setLast_name(text)}
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
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <InputField 
              label={'Phone'}
              icon={
                <MaterialIcons 
                  name="phone"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              value={phone}
              onChangeText={text => setPhone(text)}
            />

          <View>
            <View style={styles.inputField}>
              <MaterialIcons 
                name="date-range"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
          
              <TouchableOpacity  onPress={showDatepicker} >
                <Text style={{color: "#ccc", marginLeft: 5}}>Date of birth: {birthday.toLocaleDateString()}</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={birthday}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
              </TouchableOpacity>
            </View>
            </View>

            <InputField 
              label={'Address'}
              icon={
                <MaterialIcons 
                  name="home"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              value={adress}
              onChangeText={text => setAdress(text)}
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
              value={password1}
              onChangeText = {text => setPassword1(text)}
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
              value={password2}
              onChangeText = {text => setPassword2(text)}
            />

            <CustomButton label={"Register"} onPress={() => {verifyPassword(password1, password2, username, first_name, last_name, email, phone, birthday, adress)}} />

            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
              <Text>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.dummyText}>Login</Text>
              </TouchableOpacity>              
            </View>
      </KeyboardAvoidingView>
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