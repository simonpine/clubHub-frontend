import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
// import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import userPng from '../img/user.png'
import plusIcon from '../img/plus.png'
import { usersImg } from "../api"
function Home() {
    // const [userPhoto, setUserPhoto] = useState("")

    const navigate = useNavigate()

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user !== null && (
                    <div>

                        <div className='LandingNav'>
                            <Link to={{
                                pathname: "/userSettings",
                            }} className='logoCont'>
                                {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                            </Link>
                            <button className="plusButton"><img src={plusIcon} /></button>
                        </div>


                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Home