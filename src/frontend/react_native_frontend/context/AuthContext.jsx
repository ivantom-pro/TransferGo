import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../Config";

export const AuthContext = createContext()

export const AuthProvider = ({children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userAccount, setUserAccount] = useState(null);

    const login = async(username, password) => {
        let data = JSON.stringify({username, password})
        console.log(data);

        setIsLoading(true);
        
        const userInfo = await fetch(`${BASE_URL}/auth/sing_in/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        .then(function(response){
            return response.json()
        })
        .catch(error => {console.log(error); alert("Either user name or password are incorrect, please verify and retry")})

        setUserInfo(userInfo);
        setUserToken(userInfo.Token)

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        AsyncStorage.setItem('userToken', userInfo.Token)

        let token = "token " + userInfo.Token;

        const userAccountInfo = await fetch(`${BASE_URL}/account/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token
            },
        })
        .then(function(response){
            return response.json()
        })
        .catch(error => {console.log("My error "+error)})

        let userAccount = userAccountInfo[0];

        setUserAccount(userAccount);
        AsyncStorage.setItem('userAccount', JSON.stringify(userAccount))

        setIsLoading(false);
    }

    const logout = (username, password) => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userAccount');

        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let userAccount = await AsyncStorage.getItem('userAccount');

            userInfo = JSON.parse(userInfo);
            userAccount = JSON.parse(userAccount);

            if(userInfo) {
                setUserToken(userToken); 
                setUserInfo(userInfo);
                setUserAccount(userAccount);
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

    const transfer = async (amount, type, number) => {
        let token = "token " + userInfo.Token;
        let data = {
            "amount":amount,
            "type":type,
            "number":number
        }
        console.log(data);
        console.log(token);

        const transferInfo = await fetch(`${BASE_URL}/transactions/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token
            },
            data:data
        })
        .then(function(response) {
            return response.json()
        })
        .catch(function(error){
            console.log(error);
        })
        
        if(transfer) {
            alert('Transaction completed');
        }else {
            alert('An error occured')
        }

        console.log(transferInfo);
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
 
    return(
        <AuthContext.Provider value={{login, logout, register, transfer, isLoading, userToken , userInfo, userAccount}}>
            {children}
        </AuthContext.Provider>
    );
}