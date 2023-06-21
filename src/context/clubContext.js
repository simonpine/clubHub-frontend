import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../api";
import { useNavigate } from "react-router-dom";

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {
    const navigate = useNavigate()
    const [club, setClub] = useState(null)

    const setDefault = async () => {
        if ((localStorage.length) > 0) {
            const search = JSON.parse(localStorage.getItem("user"))
            const res = await getUser(search)
            if (res.length > 0) {
                setUser(res[0])
                navigate('/home')
                // return res[0]
            }
            else {
                localStorage.clear()
                navigate('/login')
            }
        }
        else {
            navigate('/login')
        }
    }

    useEffect(() => {
        // navigate('/login')
        setDefault()
    }, [])


    return (
        <ContextClub.Provider value={{ user, saveUser, setDefault }}>
            {children}
        </ContextClub.Provider>
    )
}