import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClubId } from "../api";
import io from 'socket.io-client'
import { urlBase } from "../api";
import { sendMsgEvent, sendMsgChat } from "../api";
let socket

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {
    const { id } = useParams()
    const [events, setEvents] = useState([])
    const [chat, setChat] = useState([])
    const [members, setMembers] = useState([])

    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    const [club, setClub] = useState(null)
    const [grades, setGrades] = useState(null)
    const [eventsCal, setEventsCal] = useState([])
    const [polls, setPolls] = useState([])


    useEffect(() => {
        async function setDefault() {
            const res = await getClubId(id)
            if ((res[0]) === undefined) {
                window.location.reload(true)

            }
            else {
                await setClub(res[0])
                await setGrades(res[0].gardes)
                await setEvents(res[0].events)
                await setChat(res[0].chat)
                await setMembers(res[0].members)
                await setEventsCal(res[0].calendarEvents)
                await setPolls((res[0].surveys))
            }
        }
        // console.log(sucedio)
        setDefault()

    }, [id])

    async function deaf() {
        const res = await getClubId(id)
        if ((res[0]) === undefined) {
            window.location.reload(true)

        }
        else {
            await setClub(res[0])
            await setGrades(res[0].gardes)
            await setEvents(res[0].events)
            await setChat(res[0].chat)
            await setMembers(res[0].members)
            await setEventsCal(res[0].calendarEvents)
            await setPolls((res[0].surveys))
        }
    }

    useEffect(() => {
        socket = io(urlBase)
        socket.removeAllListeners()

        socket.emit('joinClub', id)

        socket.on('emitMessageEvent', mess => {
            setEvents(prevState => [mess, ...prevState])
        })

        socket.on('emitMessageChat', mess => {
            setChat(prevState => [mess, ...prevState])
        })

        return () => {
            socket.disconnect();
        };
    }, [id])


    async function sumbmit(mess, forSocket) {

        await sendMsgEvent(mess)
        await socket.emit('newEventMessage', forSocket)
    }

    async function sumbmitChat(mess, forSocket) {

        await sendMsgChat(mess)
        await socket.emit('newChatMessage', forSocket)
    }
    return (
        <ContextClub.Provider value={{ club, grades, setRefresh, events, sumbmit, chat, sumbmitChat, eventsCal, refresh, polls, deaf, members, setMembers }}>
            {children}
        </ContextClub.Provider>
    )
}