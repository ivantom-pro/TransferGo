import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const ProfilScreen = ({navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const {userAccount} = useContext(AuthContext);
    const {userTransactionList} = useContext(AuthContext);
    let bd = userInfo.profile.birthday;
    bd = bd.split("-").reverse().join("-");
    const last = (userTransactionList) => {
        var lastDate = "None";

        if(!userTransactionList.length) {
            return lastDate;
        }else {
            lastDate = userTransactionList[0].date;
            lastDate = (lastDate.substring(0,10));
            lastDate = lastDate.split("-").reverse().join("-");
            return lastDate;          
        }
    }

    return (
        <View>
            <Header label={"Profile"} {...navigation} />
            <View style={styles.tex}>
                <Text style={{fontSize: 32, color: "#fff", padding: 10}}>
                    Welcome, {userInfo.profile.user.username}
                </Text>
            </View> 

            <ScrollView style={{backgroundColor: "#fff", paddingBottom: 100}}>
                <View style={styles.align}>
                    <Text>Balance</Text>
                    <Text>{userAccount.balance} FCFA</Text>
                </View>
                <View style={styles.align}>
                    <Text>Last transaction</Text>
                    <Text>{last(userTransactionList)}</Text>
                </View>
                <View style={styles.align}>
                        <Text>Phone</Text>                        
                    <Text>{userInfo.profile.phone}</Text>
                </View>
                <View style={styles.align}>
                    <Text>My birthday</Text>
                    <Text>{bd} </Text>
                </View>
                <View style={styles.align}>
                    <Text>Mail</Text>
                    <Text>{userInfo.profile.user.email}</Text>
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 20,
            paddingBottom: 20,

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