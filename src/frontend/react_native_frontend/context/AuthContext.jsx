import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../Config";

export const AuthContext = createContext()

export const AuthProvider = ({children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async(username, password) => {
        let data = JSON.stringify({username, password})

        setIsLoading(true);
        
        fetch("http://172.20.10.4:8000/api/auth/sing_in/", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            let userInfo = data

            setUserInfo(userInfo);
            setUserToken(userInfo.Token)

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            AsyncStorage.setItem('userToken', userInfo.Token)

            console.log(userInfo);
            console.log(userInfo.Token);
        })
        .catch(error => {console.log(error); alert("Either user name or password are incorrect, please verify and retry")})

        setIsLoading(false);
    }

    const logout = (username, password) => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')

        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if(userInfo) {
                setUserToken(userToken); 
                setUserInfo(userInfo);               
            }

            setIsLoading(false);
      
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);
 
    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken , userInfo}}>
            {children}
        </AuthContext.Provider>
    );
}