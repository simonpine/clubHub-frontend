import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
// import { useState } from "react"
import User from "../components/user"
// import {  usersImg } from "../api"


function Leaderboard() {
    // const [loading, setloading] = useState(false)
    // const [descriptionRef, setDescriptionRef] = useState('')
    // const [titleRef, setTitleRef] = useState('')
    // const [dateRef, setDateRef] = useState('')

    // const [currentDescription, setCurrentDescription] = useState('')
    // const [currentTitle, setCurrentTitle] = useState('')
    // const [currentId, setCurrentId] = useState('')

    return (
        <ContextUser.Consumer>
            {({ user, userClubs, setUserClubs }) => {
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club }) => {
                                return club && (
                                    <div>

                                        <NavClub user={user} club={club} main={6} userClubs={userClubs} setUserClubs={setUserClubs} />
                                        <div className="Log">

                                            <div>
                                                {/* {club.members.map(item => {
                                                    return (
                                                        <div>
                                                            <h3>{item}</h3>
                                                            {<img src={usersImg + item} /> || <></>}
                                                        </div>
                                                    )
                                                })} */}
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
export default Leaderboard