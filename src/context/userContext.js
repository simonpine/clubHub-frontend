import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../api";
import { useNavigate } from "react-router-dom";

export const ContextUser = createContext()

export const CustomProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const setDefault = async () => {
        if ((localStorage.length) > 0) {
            const search = JSON.parse(localStorage.getItem("user"))
            const res = await getUser(search)
            setUser(res[0])
            // navigate('/home')
        }
    }

    useEffect(() => {
        setDefault()
    }, [])
    function saveUser(item) {
        setUser(item)
        localStorage.setItem('user', JSON.stringify(item.userName))
        navigate('/home')
    }

    return (
        <ContextUser.Provider value={{ user, saveUser }}>
            {children}
        </ContextUser.Provider>
    )
}