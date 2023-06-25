import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import AddClubNav from "../components/addClubNav"
import plusIcon from '../img/plus.png'
import { usersImg, exitClub, deleteClub } from "../api"
import { useState } from "react"
import ClubCard from "../components/clubCard"
function Home() {

    const [addClub, setAddClub] = useState(false)
    const [relo, setRelo] = useState()

    return (

        <>
            {addClub &&
                <div className="plusExecut">
                    <div onClick={() => setAddClub(false)} className="BgNoColor"></div>
                    <AddClubNav />
                </div>}
            <ContextUser.Consumer>
                {({ user }) => {
                    async function exit(clubId) {
                        await exitClub({
                            userName: user.userName,
                            clubId: clubId,
                            userClubs: user.clubs,
                        })
                        user.clubs = await user.clubs.filter(item => item.clubId !== clubId)
                        setRelo(Math.random)

                    }
                    async function delet(clubId) {
                        await deleteClub({
                            clubOwner: user.userName,
                            clubsOfOwner: user.clubs,
                            clubId: clubId,
                        }, clubId)
                        user.clubs = await user.clubs.filter(item => item.clubId !== clubId)
                        setRelo(Math.random)
                    }
                    return user !== null && (
                        <>

                            <div className='LandingNav'>
                                <Link to={{
                                    pathname: "/userSettings",
                                }} className='logoCont'>
                                    {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                                </Link>
                                {/* <h1>My clubs</h1> */}
                                <button onClick={() => setAddClub(!addClub)} className="plusButton"><img src={plusIcon} alt="plus button icon" /></button>
                            </div>
                            <div className="clubListHomeContainer">
                                {user.clubs.map((clubCard) => {

                                    return (
                                        <ClubCard key={clubCard.clubId} delet={delet} exit={exit} user={user} clubCard={clubCard} />
                                    )
                                })}
                            </div>


                        </>
                    )
                }}
            </ContextUser.Consumer>
        </>
    )
}
export default Home