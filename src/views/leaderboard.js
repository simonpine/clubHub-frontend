import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import User from "../components/user"
import { useState } from "react"
import { usersImg, getUser, sortMembers } from "../api"
import close from '../img/close.png'
import { exitClub } from "../api"
import { DndContext, closestCenter } from '@dnd-kit/core'
import more from '../img/more.png'

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import UserInLeaderboard from "../components/userInLeaderboard"


function Leaderboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [sure, setSure] = useState(false)

    async function getUserInfo(userName) {
        const result = await getUser(userName)
        await setUserInfo(result[0])
        await setSure(true)
    }

    return (
        <ContextUser.Consumer>
            {({ user, userClubs, deafUs }) => {
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, deaf, members, setMembers }) => {

                                function array_move(arr, old_index, new_index) {
                                    if (new_index >= arr.length) {
                                        var k = new_index - arr.length + 1;
                                        while (k--) {
                                            arr.push(undefined);
                                        }
                                    }
                                    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                                    return arr; // for testing
                                };

                                async function chao(userName, clubsOfUser) {
                                    await setSure(false)
                                    await exitClub({
                                        userName: userName,
                                        clubId: club.id,
                                        userClubs: clubsOfUser,
                                    })
                                    await deaf()
                                }

                                async function endDrag(evt) {
                                    const { active, over } = await evt

                                    // console.log( !active.id !== over.id)
                                    if (active.id !== over.id) {
                                        const oldIndex = members.findIndex((item) => item === active.id);
                                        const newIndex = members.findIndex((item) => item === over.id);
                                        // await sortMembers(JSON.stringify({ newMembers: (array_move([...members], oldIndex, newIndex)), clubId: club.id }))
                                        // await deaf()
                                        setMembers(array_move([...members], oldIndex, newIndex))
                                    }

                                }

                                async function saveInServer(){
                                    await sortMembers(JSON.stringify({ newMembers : members, clubId: club.id}))
                                    await deaf()
                                }
                                console.log(members)
                                return club && (
                                    <>
                                        {sure &&
                                            <div className="sureCont">

                                                <div className="formAddEv">
                                                    <div className="xplusTitle">
                                                        <button onClick={() => {
                                                            setSure(false)
                                                        }} className="closeButtonFormColendar">
                                                            <img src={close} alt="colse button" />
                                                        </button>
                                                        <h3 className="cardTitleUSer">User info</h3>
                                                    </div>
                                                    <div>
                                                        {userInfo.userImg !== null && <img alt="User icon" className="moreInfoBanner" src={usersImg + userInfo.userImg} />}                                                        <div>
                                                            {userInfo.userImg !== null ? <h1 className="h1UserInfo h1MoreInfo">{userInfo.userName}</h1> : <h1 className="h1UserInfo">{userInfo.userName}</h1>}
                                                            <p className="pMoreInfo">{userInfo.description}</p>

                                                        </div>
                                                    </div>
                                                    {user.userName === club.clubOwner &&
                                                        <button onClick={() => chao(userInfo.userName, userInfo.clubs)} className="DelExi">
                                                            Expel member
                                                        </button>}
                                                </div>

                                                <div className="surebg" onClick={() => {
                                                    setSure(false)
                                                }}></div>

                                            </div>
                                        }

                                        <div>
                                            <NavClub user={user} club={club} main={7} userClubs={userClubs} deafUs={deafUs} />

                                            {members.length > 0 ?

                                                <div className="leaderboardCont">
                                                    {club.clubOwner !== user.userName ?
                                                        <>
                                                            {members.map((item, index) => {

                                                                let cor = ''
                                                                if (index === 0) {
                                                                    cor = 'dor'
                                                                }
                                                                else if (index === 1) {
                                                                    cor = 'pla'
                                                                }
                                                                else if (index === 2) {
                                                                    cor = 'bro'
                                                                }
                                                                return (
                                                                    <div className="userOfTheList">
                                                                        <div style={{ display: "flex", flexDirection: 'row' }}>
                                                                            <h3 className={`numberInList ${cor}`}>{index + 1}</h3>
                                                                            <h3 className="nomeOfUserInList">{item}</h3>
                                                                        </div>
                                                                        <button onClick={() => getUserInfo(item)} className="buttonDis">
                                                                            <img className="moreImg" src={more} alt="more info" />
                                                                        </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </>
                                                        :
                                                        <DndContext
                                                            collisionDetection={closestCenter}
                                                            onDragEnd={endDrag}
                                                        >
                                                            <SortableContext items={members} strategy={verticalListSortingStrategy}>
                                                                {members.map((item, index) => {
                                                                    let cor = ''
                                                                    if (index === 0) {
                                                                        cor = 'dor'
                                                                    }
                                                                    else if (index === 1) {
                                                                        cor = 'pla'
                                                                    }
                                                                    else if (index === 2) {
                                                                        cor = 'bro'
                                                                    }
                                                                    return (
                                                                        <UserInLeaderboard key={item} cor={cor} item={item} getUserInfo={getUserInfo} index={index}></UserInLeaderboard>
                                                                    )
                                                                })}
                                                            </SortableContext>
                                                            <button onClick={saveInServer} className="getIn logInButton">Save changes</button>
                                                        </DndContext>}

                                                </div>

                                                :

                                                <h2 className="clubWithOutMembers2">The club must have members to display the leaderboard</h2>

                                            }
                                        </div>

                                    </>
                                )
                            }}
                        </ContextClub.Consumer>
                    </>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Leaderboard