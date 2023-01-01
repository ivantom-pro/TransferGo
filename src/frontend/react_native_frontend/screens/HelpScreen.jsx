import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header";

const HelpScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Help"} {...navigation} />
        </View>
    )
}

export default HelpScreen;