import React from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Platform
} from 'react-native';

const StartScreen = ({navigation}) => {
  return (
    <SafeAreaView 
      style={{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <Text style={styles.go}>TRAN$FER GO</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.icon}>
          <Text style={{fontSize: 128, transform: [{rotate: '-15deg'}]}}>TF</Text>
        </View>      
      </View>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}
        >
        <Text style={styles.startText}>Get Started</Text>
        <MaterialIcons name="arrow-forward-ios"  size={22} color="#fff"/>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default StartScreen

const styles = StyleSheet.create({
  go: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color:'#20315f',
    marginTop: 40,
  },
  btn: {
    backgroundColor: "#2137B2",
    fontWeight: "bold",
    padding: 20,
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  startText: {
    fontWeight: 'bold',
    fontSize: '16',
    color: 'white'
  },
  icon: {
    width: 300, 
    height: 300,
    backgroundColor: '#2137B2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  }
})