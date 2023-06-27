import { Link } from "react-router-dom"
import { usersImg } from "../api"
import userPng from '../img/user.png'
import menu from '../img/menu.png'
import { useState, useEffect } from "react"
import colibri from '../img/clubHub.svg'
import { useNavigate } from "react-router-dom";
import { exitClub, deleteClub } from "../api"


function NavClub({ user, club, main }) {
    const navigate = useNavigate()
    const [close, setClose] = useState('close')
    const [close2, setClose2] = useState('closeBgc')
    const [main1, setMain1] = useState('')
    const [main2, setMain2] = useState('')
    const [main3, setMain3] = useState('')
    const [main4, setMain4] = useState('')
    useEffect(() => {
        if (main === 1) {
            setMain1('selected')
        }
        else if (main === 2) {
            setMain2('selected')
        }
        else if (main === 3) {
            setMain3('selected')
        }
        else if (main === 4) {
            setMain4('selected')
        }
    }, [])

    async function exit() {
        await exitClub({
            userName: user.userName,
            clubId: club.id,
            userClubs: user.clubs,
        })
        user.clubs = await user.clubs.filter(item => item.clubId !== club.id)
        await navigate('/home')

    }
    async function delet() {
        await deleteClub({
            clubOwner: user.userName,
            clubsOfOwner: user.clubs,
            clubId: club.id,
        }, club.id)
        user.clubs = await user.clubs.filter(item => item.clubId !== club.id)
        navigate('/home')
    }
    return (
        <>
            <div className='LandingNav'>
                <Link to={{
                    pathname: "/userSettings",
                }} className='logoCont'>
                    {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                </Link>
                <button onClick={() => {
                    setClose('')
                    setClose2('')
                }} className="plusButton"><img src={menu} alt="plus button icon" /></button>
            </div>
            <div className={'menu ' + close}>
                <div className="imgTextContMenu">
                    <Link className="returnToHome" to={{ pathname: "/home" }}><img alt="colibriLogo" src={colibri} /></Link>

                    <Link className={"LinkInClubMenu " + main1} to={{ pathname: "/club/" + club.id }}>Events</Link>
                    <Link className={"LinkInClubMenu " + main2} to={{ pathname: "/chat/" + club.id }}>Grades</Link>
                    <Link className={"LinkInClubMenu " + main3} to={{ pathname: "/gardes/" + club.id }}>Chat</Link>
                    {club.clubOwner === user.userName && <Link className={"LinkInClubMenu " + main4} to={{ pathname: "/Settings/" + club.id }}>Settings</Link>}
                </div>
                {club.clubOwner !== user.userName ? <button onClick={exit} className="DelExi">Exit club</button> : <button onClick={delet} className="DelExi">Delete club</button>}

            </div>
            <div onClick={() => {
                setClose('close')
                setClose2('closeBgc')
            }} className={"closeBg " + close2}></div>
        </>
    )
}
export default NavClub