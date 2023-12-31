import { Link } from "react-router-dom"
import menu from '../img/menu.png'
import { useState, useEffect } from "react"
import closePng from '../img/close.png'
import { useNavigate } from "react-router-dom";
import { exitClub, deleteClub } from "../api"

function NavClub({ user, club, main, userClubs, deafUs }) {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const [close, setClose] = useState('close')
    const [close2, setClose2] = useState('closeBgc')
    const [main1, setMain1] = useState('')
    const [main2, setMain2] = useState('')
    const [main3, setMain3] = useState('')
    const [main4, setMain4] = useState('')
    const [main5, setMain5] = useState('')
    const [main6, setMain6] = useState('')
    const [main7, setMain7] = useState('')
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
        else if (main === 5) {
            setMain5('selected')
        }
        else if (main === 7) {
            setMain7('selected')
        }
        else {
            setMain6('selected')
        }
    }, [main])

    async function exit() {
        await setloading(true)
        await exitClub({
            userName: user.userName,
            clubId: club.id,
            userClubs: userClubs,
        })

        await deafUs()
        await setloading(false)
        await navigate('/home')
    }
    async function delet() {
        await setloading(true)
        await deleteClub({
            clubOwner: user.userName,
            clubsOfOwner: user.clubs,
            clubId: club.id,
        }, club.id)

        await deafUs()
        await setloading(false)
        await navigate('/home')
    }
    return (
        <>
            {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

            <Link to={{ pathname: "/home" }} className="getIn espPlusButton2">Back Home</Link>
            <button onClick={() => {
                setClose('')
                setClose2('')
            }} className="plusButton espPlusButton"><img src={menu} alt="plus button icon" /></button>

            <div className={'menu ' + close}>
                <div className="imgTextContMenu">
                    <button className="returnToHome" onClick={() => {
                        setClose('close')
                        setClose2('closeBgc')
                    }}><img alt="colibriLogo" src={closePng} /></button>

                    <Link className={"LinkInClubMenu " + main1} to={{ pathname: "/club/" + club.id }}>Events</Link>
                    {club.existGrades ? <Link className={"LinkInClubMenu " + main2} to={{ pathname: "/gardes/" + club.id }}>Grades</Link> : <></>}
                    {club.existChat ? <Link className={"LinkInClubMenu " + main3} to={{ pathname: "/chat/" + club.id }}>Chat</Link> : <></>}
                    <Link className={"LinkInClubMenu " + main5} to={{ pathname: "/schedule/" + club.id }}>Schedule</Link>
                    <Link className={"LinkInClubMenu " + main6} to={{ pathname: "/surveys/" + club.id }}>Surveys</Link>
                    <Link className={"LinkInClubMenu " + main7} to={{ pathname: "/leaderboard/" + club.id }}>Leaderboard</Link>

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