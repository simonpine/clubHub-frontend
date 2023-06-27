import { ContextUser } from "../context/userContext"
import AddClubNav from "../components/addClubNav"
import plusIcon from '../img/plus.png'
import { exitClub, deleteClub } from "../api"
import { useState } from "react"
import ClubCard from "../components/clubCard"
import User from "../components/user"
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
                                <User lin={user.userImg} />
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