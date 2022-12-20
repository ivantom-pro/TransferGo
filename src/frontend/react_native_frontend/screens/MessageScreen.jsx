import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const MessageScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Messages"} onPress={() => navigation.openDrawer()}/>
            <ScrollView style={{backgroundColor: "#2137B2"}}>

            </ScrollView>
        </View>

    )
}

export default MessageScreen;

const styles = StyleSheet.create(
    {

    }
)