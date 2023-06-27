import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClubId } from "../api";
import io from 'socket.io-client'

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {

    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    const { id } = useParams()
    const [club, setClub] = useState(null)
    const [grades, setGrades] = useState(null)

    async function setDefault() {
        const res = await getClubId(id)
        await setClub(res[0])
        await setGrades(res[0].gardes)
    }
    useEffect(() => {
        const socket = io('https://clubhub-backend.up.railway.app')
        setDefault()
    }, [])


    return (
        <ContextClub.Provider value={{ club, setClub, grades, setGrades, setRefresh }}>
            {children}
        </ContextClub.Provider>
    )
}