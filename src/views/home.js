import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import AddClubNav from "../components/addClubNav"
import plusIcon from '../img/plus.png'
import { usersImg } from "../api"
import { useState } from "react"
import ClubCard from "../components/clubCard"
function Home() {

    const [addClub, setAddClub] = useState(false)

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user !== null && (
                    <div>
                        {addClub &&
                            <div className="plusExecut">
                                <div onClick={() => setAddClub(false)} className="BgNoColor"></div>
                                <AddClubNav />
                            </div>}
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
                                    <ClubCard key={clubCard.clubId} clubCard={clubCard} />
                                )
                            })}
                        </div>


                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Home