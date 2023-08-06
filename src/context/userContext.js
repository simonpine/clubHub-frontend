import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export const ContextUser = createContext()

export const CustomProvider = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [user, setUser] = useState(null);
    const [userClubs, setUserClubs] = useState([]);


    useEffect(() => {
        async function setDefault() {
            if ((localStorage.length) > 0) {
                const search = JSON.parse(localStorage.getItem("user"))
                const res = await getUser(search)

                if (res.length > 0) {
                    await setUser(res[0])

                    await setUserClubs(res[0].clubs)
                    await pathname === '/login' && navigate('/home')
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

        setDefault()
    }, [])

    async function deafUs() {
        if ((localStorage.length) > 0) {
            const search = JSON.parse(localStorage.getItem("user"))
            const res = await getUser(search)

            if (res.length > 0) {
                await setUser(res[0])

                await setUserClubs(res[0].clubs)
                await pathname === '/login' && navigate('/home')
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

    function saveUser(item) {
        setUser(item)
        setUserClubs(item.clubs)
        localStorage.setItem('user', JSON.stringify(item.userName))
        navigate('/home')
    }
    return (
        <ContextUser.Provider value={{ user, saveUser, userClubs, deafUs }}>
            {children}
        </ContextUser.Provider>
    )
}