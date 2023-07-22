import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import User from "../components/user"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { calendarUpdate } from "../api"

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Schedule() {
    // const [loading, setloading] = useState(false)
    const [descriptionRef, setDescriptionRef] = useState('')
    const [titleRef, setTitleRef] = useState('')
    const [dateRef, setDateRef] = useState('')

    const [currentDescription, setCurrentDescription] = useState('')
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentId, setCurrentId] = useState('')

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                function handleSelectEvent(evt) {
                    setCurrentDescription(evt.description)
                    setCurrentTitle(evt.title)
                    setCurrentId(evt.id)
                }
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, eventsCal, setEventsCal }) => {
                                async function handleSubmit(evt) {
                                    evt.preventDefault();
                                    const da = await dateRef.split('-')
                                    const nuwEvt = await {
                                        id: Date.now(),
                                        title: titleRef,
                                        description: descriptionRef,
                                        allDay: true,
                                        start: new Date(da[0] + '-' + da[1] + '-' + da[2][0] + (+da[2][1] + 1)),
                                        end: new Date(da[0] + '-' + da[1] + '-' + da[2][0] + (+da[2][1] + 1)),
                                    }
                                    await setEventsCal([...eventsCal, nuwEvt])
                                    await setDescriptionRef('')
                                    await setTitleRef('')
                                    await setDateRef('')

                                    await calendarUpdate(JSON.stringify({
                                        clubId: club.id,
                                        calendarEvts: [...eventsCal, nuwEvt],
                                    }))
                                }
                                return club && (
                                    <div>

                                        <NavClub user={user} club={club} main={5} />
                                        <div className="Log allCalendarCont">
                                            {currentId !== '' || user.userName === club.clubOwner ?
                                                <div className="eventDescripCont">
                                                    {club.clubOwner === user.userName &&
                                                        <form onSubmit={handleSubmit} className="formAddEv">
                                                            <div className="sectionAddEv">
                                                                <h2 className="inputIdentify">Description:</h2>
                                                                <textarea value={descriptionRef} id="descriptionArea" onChange={(evt) => setDescriptionRef(evt.target.value)} className="textArea" placeholder='The cooking activity will take place in the dining room this day' />

                                                            </div>
                                                            <div className="sectionAddEv speseccreevt">
                                                                <div>
                                                                    <h2 className="inputIdentify">Title:</h2>
                                                                    <input id="NewUserNamee" value={titleRef} onChange={(evt) => setTitleRef(evt.target.value)} className="inputText" type="text" placeholder='Change of location' />

                                                                </div>
                                                                <div>
                                                                    <h2 className="inputIdentify">Date:</h2>
                                                                    <input className="inputText" value={dateRef} type="date" onChange={(evt) => setDateRef(evt.target.value)} />
                                                                </div>
                                                                <button disabled={titleRef.length === 0 || dateRef === '' || descriptionRef.length === 0} className="getIn logInButton espCreateEvt">Add event</button>
                                                            </div>
                                                        </form>
                                                    }

                                                    {currentId !== '' &&
                                                        <div className="fullVisionEvt">
                                                        <h2>{currentTitle}</h2>
                                                        <p>{currentDescription}</p>
                                                        {currentTitle !== '' & club.clubOwner === user.userName ?
                                                            <button onClick={() => {
                                                                const newArr = eventsCal.filter((item) => item.id !== currentId)
                                                                setEventsCal(newArr)
                                                                calendarUpdate(JSON.stringify({
                                                                    clubId: club.id,
                                                                    calendarEvts: newArr,
                                                                }))
                                                                setCurrentDescription('')
                                                                setCurrentId('')
                                                                setCurrentTitle('')
                                                            }} className="DelExi">Delete event</button>
                                                            :
                                                            <></>
                                                        }
                                                    </div>}

                                                </div>
                                                :
                                                <></>
                                                }
                                            <div className="scheduleContainer">
                                                <div className="myCustomHeight">
                                                    <Calendar
                                                        localizer={localizer}
                                                        events={eventsCal}
                                                        startAccessor="start"
                                                        endAccessor="end"
                                                        style={{ height: '500px' }}
                                                        views={{
                                                            month: true,
                                                            agenda: true,
                                                        }}
                                                        onSelectEvent={handleSelectEvent}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )
                            }}
                        </ContextClub.Consumer>
                    </>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Schedule