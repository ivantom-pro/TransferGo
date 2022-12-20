import React, { createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = () => {
    return(
        <AuthContext.Provider>

        </AuthContext.Provider>
    );
}