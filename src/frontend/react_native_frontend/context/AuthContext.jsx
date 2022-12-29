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
        
        fetch(`${BASE_URL}/auth/sing_in/`, {
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
                
                let id = userInfo.profile.user.id
                console.log(id);
                
                fetch(`${BASE_URL}/profile/${id}/`, {
                    method: 'GET',
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let userAccountInfo = data;
                    console.log(userAccountInfo);
                })
                .then(function(error){
                    console.log(error);
                })
            }

            setIsLoading(false);
      
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }

    }

    const register = (username, first_name, last_name, email, password1, phone, birthday, adress) => {
        birthday = birthday.split("/").reverse().join("-");
        let d = {
            "user":{
              "username":username,
              "first_name":first_name,
              "last_name":last_name,
              "email":email,
              "password":password1
            },
            "phone":phone,
            "birthday":birthday,
            "adress":adress
          }
          let data = JSON.stringify(d)

        fetch(`${BASE_URL}/profile/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            let userRegInfo = data
            console.log(userRegInfo)
        })
        .catch(function(error){
            console.log(error);
        })
        
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
 
    return(
        <AuthContext.Provider value={{login, logout, register, isLoading, userToken , userInfo}}>
            {children}
        </AuthContext.Provider>
    );
}