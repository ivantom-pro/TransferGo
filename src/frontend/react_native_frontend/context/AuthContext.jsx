import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../Config";

export const AuthContext = createContext()

export const AuthProvider = ({children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = (username, password) => {
        let data = JSON.stringify({username, password})
        console.log(data)

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
            console.log(data)
            console.log(data.Token)
        })
        .catch(error => console.log(error))


        //setUserToken('terb');
        //AsyncStorage.setItem('userToken', 'terb')
        setIsLoading(false);
    }

    const postData = async(username, password) => {
        const url = "http://127.0.0.1:8000/api/auth/sing_in";
        const data = {
            username,
            password
        }
        try {
            const reponse = await axios.post(url, data)

            if(reponse.status === 200) {
                console.log('Success')
            }
        }catch(error) {
            alert("Connexion error")
            console.log(username, password);
            console.log(error);
        }
    }

    const logout = (username, password) => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);  
            setIsLoading(false);       
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);
 
    return(
        <AuthContext.Provider value={{login, logout, postData, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}