import React, { useContext } from "react";
import { View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";

export default function CustomDrawer(props) {
    const {userInfo} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    let letter = userInfo.profile.user.username[0];
    letter = letter.toUpperCase();
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView 
                {...props}
                contentContainerStyle={{
                    backgroundColor: "#2137B2",
                }}>
                    <View style={{margin: 20}}>
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: '#2137B2',
                            borderStyle: 'solid',
                            backgroundColor: '#fff',
                            justifyContent: 'center'}}>
                            <Text style={{fontSize: 50,textAlign: 'center', color: '#2137B2'}}>{letter}</Text>
                        </View>                        
                    </View>

            <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                <DrawerItemList {...props}/>
            </View>
            </DrawerContentScrollView> 

            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => {alert('About the evelopment team:\nRonan(frontend, Design)\nBrown(backend)\nIvan(backend, Test)\nAgnès(Design)')}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialIcons name="info-outline" size={22} color={'#2137B2'} />
                        <Text style={{paddingLeft: 10, color: '#2137B2'}}>
                            About us
                        </Text>    
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 15}}>
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