import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";

const ProfilScreen = () => {
    return (
        <View>
            <Header label={"Profile"}/>   
            <ScrollView>
                <Text style={styles.tex}>F</Text>
                <Text style={{padding: 100, backgroundColor: 'red'}}>F</Text>    
                <Text style={{padding: 100, backgroundColor: 'green'}}>F</Text>
                <Text style={{padding: 100, backgroundColor: 'grey'}}>F</Text>

            </ScrollView>
        </View>

    )
}

export default ProfilScreen;

const styles = StyleSheet.create(
    {
        tex: {
            padding: 100,
            backgroundColor: 'orange'
        }
    }
)