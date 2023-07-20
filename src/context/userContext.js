import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../api";
import { useNavigate } from "react-router-dom";

export const ContextUser = createContext()

export const CustomProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    async function setDefault() {
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
        setDefault()
    }, [])
    function saveUser(item) {
        setUser(item)
        localStorage.setItem('user', JSON.stringify(item.userName))
        navigate('/home')
    }

    function deleteClub(id){
        user.clubs = user.clubs.filter(item => item.clubId !== id)
    }
    return (
        <ContextUser.Provider value={{ user, saveUser, deleteClub }}>
            {children}
        </ContextUser.Provider>
    )
}