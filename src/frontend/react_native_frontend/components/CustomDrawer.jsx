import React from "react";
import { View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function CustomDrawer(props) {
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView> 
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialIcons name="info-outline" size={22} color={'#2137B2'} />
                        <Text style={{paddingLeft: 10, color: '#2137B2'}}>
                            About us
                        </Text>    
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialIcons name="logout" size={22} color={'#2137B2'} />
                        <Text style={{paddingLeft: 10, color: '#2137B2'}}>
                            Sign out
                        </Text>    
                    </View>
                </TouchableOpacity>
            </View>           
        </View>

    )
}