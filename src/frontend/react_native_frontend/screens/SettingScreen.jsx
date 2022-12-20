import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header";


const SettingScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Settings"} onPress={() => navigation.openDrawer()} />
        </View>
    )
}

export default SettingScreen;