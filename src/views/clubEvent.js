import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import { useState } from "react"
import { BannersImg, chatsFlies } from "../api"
import User from "../components/user"
import NavClub from "../components/navClub"
import copy from '../img/copy.png'
import send from '../img/send.png'
import upload from '../img/upload.png'
import doc from '../img/document.png'


function ClubEvent() {
    const [message, setMessage] = useState('')
    const [err, setErr] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

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
                                    const date = new Date().valueOf();
                                    const formData = new FormData()
                                    let today = new Date();
                                    const dd = String(today.getDate()).padStart(2, '0');
                                    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                    const yyyy = today.getFullYear();

                                    today = mm + '/' + dd + '/' + yyyy
                                    const forMoment = {
                                        id: date,
                                        from: user.userName,
                                        idClub: club.id,
                                        fileName: null,
                                        message: null,
                                        typeMess: null,
                                        date: today,
                                        logo: user.userImg,
                                    }

                                    formData.append('id', date)
                                    formData.append('logo', user.userImg)
                                    formData.append('date', today)
                                    formData.append('from', user.userName)
                                    formData.append('idClub', club.id)

                                    if ((message !== '' & message.replaceAll(' ', '').length > 0) & selectedImage !== null) {

                                        const UploadFile = renameFile(selectedImage, date + club.id)

                                        forMoment.fileName = UploadFile.name
                                        forMoment.message = message
                                        formData.append('file', UploadFile)
                                        formData.append('message', message)

                                        formData.append('fileName', UploadFile.name)

                                        if (selectedImage.type.split('/')[0] === 'image') {
                                            formData.append('typeMess', 'text+img')
                                            forMoment.typeMess = 'text+img'
                                        }
                                        else {
                                            formData.append('typeMess', 'text+file')
                                            forMoment.typeMess = 'text+file'
                                        }
                                    }
                                    else if (message !== '' & message.replaceAll(' ', '').length > 0) {
                                        forMoment.message = message
                                        formData.append('fileName', null)
                                        formData.append('message', message)
                                        formData.append('typeMess', 'text')
                                        forMoment.typeMess = 'text'
                                    }
                                    else {
                                        const UploadFile = renameFile(selectedImage, date + club.id)

                                        forMoment.fileName = UploadFile.name
                                        formData.append('file', UploadFile)
                                        formData.append('fileName', UploadFile.name)
                                        formData.append('message', null)

                                        if (selectedImage.type.split('/')[0] === 'image') {
                                            formData.append('typeMess', 'img')
                                            forMoment.typeMess = 'img'
                                        }
                                        else {
                                            formData.append('typeMess', 'file')
                                            forMoment.typeMess = 'file'
                                        }
                                    }
                                    sumbmit(formData, forMoment)
                                    setSelectedImage(null)
                                    setMessage('')

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
                                                        <h3>{club.title}:</h3>
                                                        <button onClick={() => {
                                                            navigator.clipboard.writeText(club.id)
                                                        }} className="getIn logInButton">{club.id} <img src={copy} alt="copyIcon" /></button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="chatContainer">
                                                <div className={club.clubOwner !== user.userName ? "oneH msgCont" : 'msgCont'}>
                                                    <div className="messCont">
                                                        {events.length !== 0 &&


                                                            events.map(evt => {
                                                                return (
                                                                    <div key={evt.id} className={evt.from !== user.userName ? "allMessageCont" : "allMessageCont otherSender"}>
                                                                        {(evt.typeMess !== 'file' & evt.typeMess !== 'text+file') ?
                                                                            <div className="mess messEvents" >
                                                                                <h4 className="messInfo messInfoEvents">{evt.date}</h4>
                                                                                {evt.message !== 'null' && <h3 className="textMessage">{evt.message}</h3>}
                                                                                {evt.fileName !== null & evt.fileName !== 'null' ? <img className="imgUploadedByUser" alt='imgUploadedByUser' src={chatsFlies + evt.fileName} /> : <></>}
                                                                            </div>
                                                                            :
                                                                            <div className="mess messEvents" >
                                                                                <h4 className="messInfo">{evt.from === user.userName ? <>You</> : <>{evt.from}</>} {evt.date}</h4>
                                                                                {evt.message !== 'null' && <h3 className="textMessage">{evt.message}</h3>}
                                                                                {evt.fileName !== null & evt.fileName !== 'null' ?
                                                                                    <button onClick={() => {
                                                                                        const aTag = document.createElement('a')
                                                                                        aTag.href = chatsFlies + evt.fileName
                                                                                        aTag.setAttribute('download', evt.fileName)
                                                                                        aTag.target = 'blank'
                                                                                        document.body.appendChild(aTag)
                                                                                        aTag.click()
                                                                                        aTag.remove()
                                                                                    }} className="downLoadButton">
                                                                                        <img alt="fileImg" src={doc} />
                                                                                        Download
                                                                                    </button> : <></>}
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
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
                                                            <button disabled={message.replaceAll(' ', '').length < 1 & selectedImage === null} className="sendButton"><img alt="SendButton" src={send} /></button>
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