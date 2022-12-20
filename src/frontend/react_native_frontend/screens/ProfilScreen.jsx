import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const ProfilScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Profile"} onPress={() => navigation.openDrawer()}/>
                <View style={styles.tex}>
                    <MaterialIcons name="account-circle" color={'#fff'} size={100} />
                    <Text style={{fontSize: 32, color: "#fff"}}>Welcome, Terb</Text>
                </View> 

            <ScrollView style={{backgroundColor: "#2137B2"}}>

            </ScrollView>
        </View>

    )
}

export default ProfilScreen;

const styles = StyleSheet.create(
    {
        tex: {
            backgroundColor: '#2137B2',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
        }
    }
)