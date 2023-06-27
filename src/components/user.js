import { Link } from "react-router-dom"
import { usersImg } from "../api"
import userPng from '../img/user.png'
function User({ lin }) {
    return (
        <Link to={{
            pathname: "/userSettings",
        }} className='logoCont'>
            {lin !== null ? <img className="imgInBut" src={usersImg + lin} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
        </Link>
    )
}
export default User