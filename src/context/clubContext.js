import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClubId } from "../api";

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {
    const { id } = useParams()
    const [club, setClub] = useState(null)

    async function setDefault() {
        const res = await getClubId(id)
        await setClub(res[0])
    }
    useEffect(() => {
        setDefault()
    }, [])


    return (
        <ContextClub.Provider value={{club, setClub}}>
            {children}
        </ContextClub.Provider>
    )
}