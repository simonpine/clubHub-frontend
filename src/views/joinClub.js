
import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import { usersImg } from "../api"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getClubs, getClubId, BannersImg, joinToClub } from "../api";
import ClubCardJoin from '../components/clubCardJoin'

function JoinClub() {
    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [codeRef, setCodeRef] = useState('')
    const [clubList, setClubList] = useState([])
    const [show, setShow] = useState({})
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
            {({ user }) => {
                async function searchClub(evt) {
                    await setloading(true)
                    await evt.preventDefault()
                    await setShow({})

                    await setErr('')

                    if (user.clubs.some(a => a.clubId === codeRef)) {
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
                    const userClubsObj = await {
                        clubId: club.id,
                        own: false,
                        clubTitle: club.title,
                        clubBanner: club.clubBanner,
                        clubDescription: club.description,
                    }
                    await user.clubs.push(userClubsObj)
                    await setShow({})
                    // console.log((user.clubs))


                    await joinToClub({
                        newMembers: [...club.members, user.userName],
                        clubId: club.id,
                        clubsOfMember: (user.clubs),
                        newMember: user.userName,
                    })
                    // await console.log(JSON.stringify(user))

                }
                return user !== null && (
                    <div>
                        <div className='LandingNav'>
                            <Link to={{
                                pathname: "/userSettings",
                            }} className='logoCont'>
                                {user.userImg !== null ? <img className="imgInBut" src={usersImg + user.userImg} alt='User Logo' /> : <img src={userPng} alt='User Logo' />}
                            </Link>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>
                        <div className="Log revers">
                            <div className="clublistjoinCont">
                                {clubList.map(item => {
                                    return !user.clubs.some(a => a.clubId === item.id) && (
                                        <ClubCardJoin key={item.id} jo={join} item={item} />

                                    )
                                })}
                            </div>
                            <div className="pasd mar0">
                                {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                                <div className="formLogin joinSelection">
                                    <form onSubmit={searchClub}>
                                        <h2 className="inputIdentify">Search by code:</h2>
                                        <input id="CodeOfAClub" value={codeRef} onChange={(evt) => setCodeRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder='97p2a1z6uwc' />
                                        <button disabled={(codeRef.length === 0)} className="getIn logInButton mTop">Search</button>
                                    </form>


                                    {JSON.stringify(show) === JSON.stringify({}) ? <h3 className="errorAnoun totop"> {err}</h3> :
                                        <div className="bgShow totop">
                                            <div className="firstPartShow">
                                                <div className="ShowImgCont">
                                                    <img src={BannersImg + show.clubBanner} alt="Club Banner" />
                                                </div>
                                                <div>
                                                    <h2>{show.title}</h2>
                                                    <h5 className="green">{show.clubOwner}</h5>
                                                </div>
                                            </div>
                                            <p className="pInShow">{show.description}</p>

                                            <button onClick={() => join(show)} className="getIn logInButton">Join</button>
                                        </div>
                                    }

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