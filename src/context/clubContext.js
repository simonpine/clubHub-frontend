import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClubId } from "../api";
import io from 'socket.io-client'
import { urlBase } from "../api";
import { sendMsgEvent } from "../api";
let socket 

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {

    const { id } = useParams()
    const [events, setEvents] = useState([])
    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    const [club, setClub] = useState(null)
    const [grades, setGrades] = useState(null)

    async function setDefault() {
        const res = await getClubId(id)
        await setClub(res[0])
        await setGrades(res[0].gardes)
        await setEvents(res[0].events)
    }
    useEffect(() => {
        setDefault()
    }, [])

    useEffect(()=> {

        socket = io(urlBase)
        socket.removeAllListeners()
    
        socket.emit('joinClub', id)
    
        socket.on('emitMessageEvent', mess => {
            console.log(mess)
            setEvents(prevState => [mess,...prevState])
        })
        return () => {
            socket.disconnect();
          };
    }, [])


    async function sumbmit(mess, forSocket){

        await sendMsgEvent(mess)
        await console.log('se subio')
        await socket.emit('newEventMessage', forSocket)
    }

    return (
        <ContextClub.Provider value={{ club, setClub, grades, setGrades, setRefresh, events, sumbmit }}>
            {children}
        </ContextClub.Provider>
    )
}