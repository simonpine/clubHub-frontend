import { ContextUser } from "../context/userContext"
import AddClubNav from "../components/addClubNav"
import plusIcon from '../img/plus.png'
import empty from '../img/empty.png'
import { useState } from "react"
import ClubCard from "../components/clubCard"
import User from "../components/user"
import metting from '../img/meeting.png'
import { Link } from "react-router-dom"
function Home() {
    const [addClub, setAddClub] = useState(false)
    return (
        <>
            {addClub &&
                <div className="plusExecut">
                    <div onClick={() => setAddClub(false)} className="BgNoColor"></div>
                    <AddClubNav />
                </div>}
            <ContextUser.Consumer>
                {({ user, userClubs, userFriends }) => {
                    return user !== null && (
                        <>
                            <div className='LandingNav'>
                                <User lin={user.userImg} />
                                <button onClick={() => setAddClub(!addClub)} className="plusButton"><img src={plusIcon} alt="plus button icon" /></button>
                            </div>
                            <div className="HomePageCont">
                                {userClubs.length > 0 ?
                                    <div>
                                        <h2>Clubs:</h2>
                                        <div className="clubListHomeContainer">
                                            {userClubs.map((clubCard) => {
                                                return (
                                                    <ClubCard key={clubCard.clubId} user={user} clubCard={clubCard} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                    :
                                    <div className="EmptyMsg">
                                        <div className="allEmptCont">
                                            <img className="empty" src={empty} alt="empty" />
                                            <h3 className="noH3">You are not in any club</h3>
                                            <div className="linksEmp">
                                                <Link style={{ margin: '0px' }} to={{
                                                    pathname: "/joinClub",
                                                }} className="getInCreate">Join club</Link>
                                                <Link to={{
                                                    pathname: "/createClub",
                                                }} className="getInCreate">Create club</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {userFriends.length > 0 ?
                                    <div className="clubListHomeContainer">
                                        {/* {userClubs.map((clubCard) => {
                                            return (
                                                <ClubCard key={clubCard.clubId} user={user} clubCard={clubCard} />
                                            )
                                        })} */}
                                    </div>
                                    :
                                    <div className="EmptyMsg">
                                        <div className="allEmptCont">
                                            <img className="empty" src={metting} alt="empty" />
                                            <h3 className="noH3">You have no friends</h3>
                                            <div style={{ justifyContent: 'center' }} className="linksEmp">
                                                <Link style={{ margin: '0px' }} to={{
                                                    // pathname: "/addFriends",
                                                }} className="getInCreate">Meet friends</Link>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </>
                    )
                }}
            </ContextUser.Consumer>
        </>
    )
}
export default Home