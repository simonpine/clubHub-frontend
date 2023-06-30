import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClubId } from "../api";
import io from 'socket.io-client'
import { urlBase } from "../api";
let socket 

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {

    const { id } = useParams()
    // const socket = io('http://localhost:2000', { query: { myParam: id } })


    // const [socket, setSocket] = useState(null)
    const [events, setEvents] = useState([])
    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    const [club, setClub] = useState(null)
    const [grades, setGrades] = useState(null)

    async function setDefault() {
        const res = await getClubId(id)
        await setClub(res[0])
        await setGrades(res[0].gardes)
        // socket.on('newEvent', message => console.log(message))

        // socket = await io('http://localhost:2000', { query: { myParam: '123' } })
    }
    useEffect(() => {
        setDefault()
    }, [])

    // function recive() {
    //     socket.on('newEvent', message => {

    //         // events.push(message)

    //         console.log(socket)

    //     })
    //     socket.off('newEvent', message => {

    //         // events.push(message)

    //         console.log(socket)

    //     })
    // }
    // useEffect(() => {

    //     socket.emit('newEvent', id)
        
    // }, [])

    // if (socket !== null)  {
    //     socket.on('newEvent', message => {

    //         // events.push(message)

    //         console.log(socket)

    //     })
    //     socket.off('newEvent', message => {

    //         // events.push(message)

    //         console.log(socket)

    //     })
    // }


    useEffect(()=> {

        socket = io(urlBase)
        socket.removeAllListeners()
    
        socket.emit('joinClub', id)
    
        socket.on('emitMessage', mess => {
            console.log(mess)
            // setEvents([...events, mess])
            setEvents(prevState => [...prevState, mess])
        })
        return () => {
            socket.disconnect();
          };
    }, [])


    function sumbmit(mess){
        socket.emit('newEventMessage', mess)
    }

    return (
        <ContextClub.Provider value={{ club, setClub, grades, setGrades, setRefresh, events, sumbmit }}>
            {children}
        </ContextClub.Provider>
    )
}