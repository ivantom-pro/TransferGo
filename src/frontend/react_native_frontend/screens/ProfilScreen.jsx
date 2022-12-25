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
                <View style={styles.align}>
                    <Text>Balance</Text>
                    <Text>0000 FCFA</Text>
                </View>

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
        },
        align: {
            alignItems: "center",
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: '#ccc',
            borderRadius: 10,
            marginBottom: 5,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
        },
    }
)