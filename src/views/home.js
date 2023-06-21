import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import AddClubNav from "../components/addClubNav"
import plusIcon from '../img/plus.png'
import { usersImg } from "../api"
import { useState } from "react"
function Home() {

    const [addClub, setAddClub] = useState(false)

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user !== null && (
                    <div>
                        {addClub &&
                            <div className="plusExecut">
                                <div onClick={()=> setAddClub(false)} className="BgNoColor"></div>
                                <AddClubNav/>
                            </div>}
                        <div className='LandingNav'>
                            <Link to={{
                                pathname: "/userSettings",
                            }} className='logoCont'>
                                {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                            </Link>
                            <button onClick={() => setAddClub(!addClub)} className="plusButton"><img src={plusIcon} /></button>
                        </div>


                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Home