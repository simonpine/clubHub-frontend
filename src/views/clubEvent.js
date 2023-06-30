import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import { useState, useEffect } from "react"
import { BannersImg } from "../api"
import User from "../components/user"
import NavClub from "../components/navClub"
import copy from '../img/copy.png'
import send from '../img/send.png'
import upload from '../img/upload.png'
import doc from '../img/document.png'
import { useParams } from "react-router-dom";


function ClubEvent() {
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [err, setErr] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <ContextUser.Consumer>
            {({ user }) => {

                return user && (


                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, events, sumbmit }) => {

                                async function hundleSubmit(evt) {
                                    evt.preventDefault()
                                    setErr('')
                                    sumbmit(club.id)
                                    // socket.emit('newEvent', id)

                                }

                                return club && (
                                    <div>
                                        <NavClub user={user} club={club} main={1} />
                                        <div className="Log">
                                            <div className="toTop">
                                                <div className="bannerPlusCopyContainer">
                                                    <div className="bannerContClub">
                                                        <img alt="ClubBanner" src={BannersImg + club.clubBanner} />
                                                    </div>
                                                    <div className="codeAndDesCont">
                                                        <h3>Club code: </h3>
                                                        <button onClick={() => {
                                                            navigator.clipboard.writeText(club.id)
                                                        }} className="getIn logInButton">{club.id} <img src={copy} alt="copyIcon" /></button>
                                                    </div>

                                                </div>
                                            </div>                               
                                            <div className="chatContainer">
                                                <div>
                                                    {events.length !== 0 &&
                                                        events.map(evt => <h2 key={Math.random() * 10000}>{evt}</h2>)
                                                    }
                                                </div>
                                                {club.clubOwner === user.userName &&
                                                    <form className="allFormCont" onSubmit={hundleSubmit}>

                                                        {selectedImage !== null &&
                                                            <div onClick={() => {
                                                                setSelectedImage(null)
                                                            }} className='contForFiles'>
                                                                {selectedImage.type.split('/')[0] === 'image' ?
                                                                    <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' />
                                                                    :

                                                                    <img className="notImgFileCont" alt="fileIcon" src={doc} />

                                                                }
                                                            </div>
                                                        }
                                                        {err !== '' &&
                                                            <div className="errorCont">
                                                                <h3 className="errorAnoun">{err}</h3>
                                                            </div>
                                                        }
                                                        <div className="formForChats">
                                                            <input type="file"
                                                                name="myImage"
                                                                onChange={(event) => {
                                                                    setErr('')
                                                                    setSelectedImage(null)
                                                                    if (event.target.files[0] !== undefined) {
                                                                        const fileSize = event.target.files[0].size;
                                                                        if (fileSize < 900000) {
                                                                            setSelectedImage(event.target.files[0]);
                                                                            // console.log(event.target.files[0].type)
                                                                        }
                                                                        else {
                                                                            setErr('File is bigger than the expected size')
                                                                        }
                                                                    }
                                                                }} id="myImage" className="none" />
                                                            <label className="sendButton" htmlFor="myImage">
                                                                <img src={upload} alt="uploadIcon" />
                                                            </label>
                                                            <input value={message} onChange={(evt) => {
                                                                setMessage(evt.target.value)
                                                                setErr('')
                                                            }} className="MessageInput" id="Message" type="text" />
                                                            {/* <button onClick={()=> {
                                                            const fileName = 'aasasas.docx'
                                                            const aTag = document.createElement('a')
                                                            aTag.href = 'http://localhost:2000/images/banners/aasasas.docx'
                                                            aTag.setAttribute('download', fileName)
                                                            aTag.target = 'blank'
                                                            document.body.appendChild(aTag)
                                                            aTag.click()
                                                            aTag.remove()
                                                        }}>ashjdg</button> */}
                                                            <button disabled={message.replace(' ', '').length < 1 & selectedImage === null} className="sendButton"><img alt="SendButton" src={send} /></button>
                                                        </div>
                                                    </form>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                        </ContextClub.Consumer >
                    </>
                )
            }}
        </ContextUser.Consumer >
    )
}
export default ClubEvent