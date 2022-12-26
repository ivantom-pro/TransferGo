import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const MessageScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Messages"} {...navigation}/>
            <View style={styles.tex}>
                <Text style={{
                    fontSize: 32, 
                    color: "#fff", 
                    padding: 30, 
                }}>
                    Soon Available
                </Text>
            </View> 
        </View>

    )
}

export default MessageScreen;

const styles = StyleSheet.create(
    {
        tex: {
            backgroundColor: '#2137B2',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
            borderRadius: 10,
            paddingTop: 20,
            paddingBottom: 20,
        },
    }
)