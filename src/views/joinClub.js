
import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import close from '../img/close.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getClubs, getClubId, BannersImg, usersImg, joinToClub } from "../api";
import ClubCardJoin from '../components/clubCardJoin'

function JoinClub() {
    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [codeRef, setCodeRef] = useState('')
    const [clubList, setClubList] = useState([])
    const [show, setShow] = useState({})
    const [moreInfoClub, setMoreInfoClub] = useState({})
    const [sure, setSure] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        async function clubListFunction() {
            const res = await getClubs()
            setClubList(res)
        }
        clubListFunction()
    }, [])
    return (
        <ContextUser.Consumer>
            {({ user, userClubs, deafUs }) => {
                async function searchClub(evt) {
                    await setloading(true)
                    await evt.preventDefault()
                    await setShow({})

                    await setErr('')

                    if (userClubs.some(a => a.clubId === codeRef)) {
                        await setCodeRef('')
                        await setloading(false)
                        return await setErr("You are already a member of that club")
                    }

                    const res = await getClubId(codeRef)

                    if (res.length === 0) {
                        await setErr(`The code '${codeRef}' does not exist`)
                    }
                    else {
                        await setShow(res[0])
                    }
                    await setCodeRef('')
                    await setloading(false)
                }

                async function join(club) {
                    setSure(true)
                    setMoreInfoClub(club)
                }
                async function serverChange(club) {
                    await setloading(true)
                    const userClubsObj = await {
                        clubId: club.id,
                        own: false,
                        clubTitle: club.title,
                        clubBanner: club.clubBanner,
                        clubDescription: club.description,
                    }
                    await setShow({})
                    await joinToClub({
                        newMembers: [...club.members, user.userName],
                        clubId: club.id,
                        clubsOfMember: ([...userClubs, userClubsObj]),
                        newMember: user.userName,
                    })
                    await deafUs()
                    await setSure(false)
                    await setloading(false)
                }
                return user !== null && (
                    <div>
                        {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                        {sure &&
                            <div className="sureCont">

                                <div className="formAddEv">
                                    <button onClick={() => {
                                        setSure(false)
                                    }} className="closeButtonFormColendar">
                                        <img src={close} alt="colse button" />
                                    </button>
                                    <div>
                                        <img alt="Club Banner" className="moreInfoBanner" src={BannersImg + moreInfoClub.clubBanner} />
                                        <div>
                                            <h1 className="h1MoreInfo">{moreInfoClub.title}</h1>
                                            <h3 className="OwnerClubMoreInfo">Owner: {moreInfoClub.clubOwner}</h3>
                                            <p className="pMoreInfo">{moreInfoClub.description}</p>
                                            <button className="getIn logInButton" onClick={() => {
                                                serverChange(moreInfoClub)
                                            }}>Join</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="surebg" onClick={() => {
                                    setMoreInfoClub({})
                                    setSure(false)
                                }}></div>
                            </div>
                        }
                        <div className='LandingNav'>
                            <Link to={{
                                pathname: "/userSettings",
                            }} className='logoCont'>
                                {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                            </Link>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>

                        <div className="Log">
                            <div className="pasd mar0">
                                <div className="formLogin joinSelection">
                                    <form onSubmit={searchClub}>
                                        <h2 className="inputIdentify">Search by code:</h2>
                                        <input id="CodeOfAClub" value={codeRef} onChange={(evt) => setCodeRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder='97p2a1z6uwc' />
                                        <button disabled={(codeRef.length === 0)} className="getIn logInButton mTop">Search</button>
                                    </form>
                                    {JSON.stringify(show) === JSON.stringify({}) ? <h3 className="errorAnoun totop"> {err}</h3> :
                                        <div className="bgShow totop">
                                            <div className="firstPartShow">

                                                <div>
                                                    <h2>{show.title}</h2>
                                                    <h5 className="green">{show.clubOwner}</h5>
                                                </div>
                                            </div>
                                            <p className="pInShow">{show.description.slice(0, 170)} ...</p>

                                            <button onClick={() => join(show)} className="getIn logInButton">More info</button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="clublistjoinCont">
                                <div className="forTheStick">
                                    {clubList.map(item => {
                                        return !userClubs.some(a => a.clubId === item.id) && (
                                            <ClubCardJoin key={item.id} jo={join} item={item} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default JoinClub