import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

const HelpScreen = ({navigation}) => {
    return (
        <View>
            <Header label={"Help"} {...navigation} />
            <View style={styles.btn}>
                <Text style={styles.txt}>Contact us via teyouronan@gmail.com for help</Text>
            </View>
        </View>
    )
}

export default HelpScreen;
const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2137B2',
        color: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      },
    txt: {
        color: "white",
    }
});