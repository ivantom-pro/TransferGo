import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Touchable } from "react-native";
import { AuthContext } from "../context/AuthContext";

const List = () => {
    const {userTransactionList} = useContext(AuthContext);
    const {DeleteTransaction} = useContext(AuthContext);
    let data = userTransactionList;
    const listItems = data.map(
            (element) => {
                let date = element.date.substring(0,10);
                date = date.split("-").reverse().join("-");
                let time = element.date.substring(11,19);
                return(
                    <View style={styles.elt} key={element.id} >
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{paddingLeft: 5}}>{element.amount} FCFA</Text>
                        </View>
                        <Text>{element.sender}</Text>
                        <View>
                            <Text>{date}</Text>
                            <Text>at {time}</Text>
                        </View>
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
        padding: 15,
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
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    }
})