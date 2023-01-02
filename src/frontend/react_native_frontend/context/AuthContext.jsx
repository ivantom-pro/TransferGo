import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Config";

export const AuthContext = createContext();
export const AuthProvider = ({children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userAccount, setUserAccount] = useState(null);
    const [userTransactionList, setUserTransactionList] = useState(null);

    const login = async(username, password) => {
        let data = JSON.stringify({username, password})
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
            }
        })
        .then(function(response){
            return response.json()
        })
        .catch(error => {console.log(error)})

        let userAccount = userAccountInfo[0];

        setUserAccount(userAccount);
        AsyncStorage.setItem('userAccount', JSON.stringify(userAccount))

        const userTransactionList = await fetch(`${BASE_URL}/transactions/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token
            }
        })
        .then(function(response){
            return response.json()
        })
        .catch(error => {console.log(error)});

        setUserTransactionList(userTransactionList);
        AsyncStorage.setItem('userTransactionList', JSON.stringify(userTransactionList));

        setIsLoading(false);
    }

    const logout = (username, password) => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userAccount');
        AsyncStorage.removeItem('userTransactionList');

        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let userAccount = await AsyncStorage.getItem('userAccount');
            let userTransactionList = await AsyncStorage.getItem('userTransactionList');

            userInfo = JSON.parse(userInfo);
            userAccount = JSON.parse(userAccount);
            userTransactionList = JSON.parse(userTransactionList);

            if(userInfo) {
                setUserToken(userToken); 
                setUserInfo(userInfo);
                setUserAccount(userAccount);
                setUserTransactionList(userTransactionList);
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
        let d = {
            "amount":amount,
            "type":type,
            "number":number
        }
        let data = JSON.stringify(d);

        const transferInfo = await fetch(`${BASE_URL}/transactions/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token
            },
            data:data
        })
        .then(function(response) {
            return response.json();
        })
        .catch(function(error){
            console.log(error);
        })
        
        if(transferInfo.id) {
            alert('Transaction completed');
        }else {
            alert('An error occured')
        }
    }

    const changePassword = async (old_password, new_password, confirm_password) => {
        let token = "token " + userInfo.Token;        
        let data = JSON.stringify({old_password, new_password, confirm_password});

        const changePasswordInfo = await fetch(`${BASE_URL}/auth/update_password/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token
            },
            data:data
        })
        .then(function(response){
            return response.json();
        })
        .catch(function(error){
            console.log(error);
        })
        console.log(data);

        console.log(changePasswordInfo)
    }

    const DeleteTransaction = () => {
        console.log("shall be deleted");
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
 
    return(
        <AuthContext.Provider value={{login, logout, register, transfer, changePassword, DeleteTransaction, isLoading, userToken , userInfo, userAccount, userTransactionList}}>
            {children}
        </AuthContext.Provider>
    );
}