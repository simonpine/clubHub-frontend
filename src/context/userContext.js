import React, { createContext, useState, useEffect } from "react";

export const ContextUser = createContext()

export const CustomProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if((localStorage.length) > 0){
            setUser(JSON.parse(localStorage.getItem("user")))
        }

    }, [])
    function saveUser() {
        localStorage.setItem('user', JSON.stringify(user))
    }

    return (
        <ContextUser.Provider value={{user, saveUser }}>
            {children}
        </ContextUser.Provider>
    )
}