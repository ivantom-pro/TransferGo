import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, DatePickerIOS, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";


const RegisterScreen = ({navigation}) => {
  const {register} = useContext(AuthContext); 
  const [username, setUsername] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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

  const showTimepicker = () => {
    showMode('time');
  };




  const verifyPassword = (password1, password2)  => {
    if(password1 != null && password2 != null) {
      if(password1 === password2) {
        console.log("Equal");
        return true;       
      }else {
        console.log("Not equal");
        setPassword1(null);
        setPassword2(null);
        console.log(password1);
        return false;
     }
    }else {
      console.log("Some fields are empty");
      return false;
    }
  }

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

<KeyboardAvoidingView>
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
              value={firstname}
              onChangeText={text => setFirstname(text)}
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
              value={lastname}
              onChangeText={text => setLastname(text)}
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
                <Text style={{color: "#ccc", marginLeft: 5}}>Date of birth: {date.toLocaleDateString()}</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
              </TouchableOpacity>
            </View>
            </View>

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



            <CustomButton label={"Register"} onPress={() => {register(username, firstname, lastname, email, date.toLocaleDateString(), password1)}} />

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