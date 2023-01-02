import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Touchable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const List = () => {
    const {userTransactionList} = useContext(AuthContext);
    const {DeleteTransaction} = useContext(AuthContext);
    let data = userTransactionList;
    const listItems = data.map(
            (element) => {
                let date = element.date.substring(0,10);
                date = date.split("-").reverse().join("/");
                return(
                    <View style={styles.elt}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => DeleteTransaction()}>
                                <MaterialIcons name="delete" size={22} />
                            </TouchableOpacity>
                            <Text style={{paddingLeft: 5}}>{element.amount} FCFA</Text>
                        </View>
                        <Text>{element.sender}</Text>
                        <Text>{date}</Text>
                    </View>                      
                )
            }
        )

    return(
        <View>
            <View style={styles.head}>
                <Text style={{color:"#fff"}}>Amount</Text>
                <Text style={{color:"#fff"}}>SenderId</Text>
                <Text style={{color:"#fff"}}>Date</Text>
            </View>
            <ScrollView style={{backgroundColor: "#fff"}}>
                <View style={{marginBottom: 300}}>
                    {listItems}
                </View>
            </ScrollView>            
        </View>

    )        
    

}

export default List;

const styles = StyleSheet.create({
    elt: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    head: {
        backgroundColor: "#2137B2",
        marginTop: 10,
        color: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20,
    }
})