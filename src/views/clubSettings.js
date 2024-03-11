import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import { BannersImg, changeExists, editClub, getUser, exitClub } from "../api"
import User from "../components/user"
import close from '../img/close.png'

function ClubSettings() {

    const [exist, setExist] = useState(false)
    const [whoToExpel, setWhoToExpel] = useState('')

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    const [checked3, setChecked3] = useState(false)
    const handleClick3 = () => setChecked3(!checked3)

    const [checked2, setChecked2] = useState(false)
    const handleClick2 = () => setChecked2(!checked2)

    const [expeling, setExpeling] = useState(false)

    const [loading, setloading] = useState(false)
    const [sure, setSure] = useState(false)
    const [err, setErr] = useState('')
    const [descriptioRef, setDescriptioRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [fileName, setFileName] = useState('Change banner')
    const [selectedImage, setSelectedImage] = useState(null);
    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    const formData = new FormData()
    return (
        <ContextUser.Consumer>
            {({ user, userClubs, deafUs }) => {
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, deaf }) => {

                                async function changeClub(evt) {
                                    await evt.preventDefault();
                                    await setloading(true)

                                    if (nameRef === '' & selectedImage === null & descriptioRef !== '') {

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)

                                        club.description = descriptioRef
                                        user.clubs = newClubsArray
                                    }
                                    else if (descriptioRef === '' & selectedImage === null & nameRef !== '') {


                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                    }
                                    else if (descriptioRef === '' & nameRef === '' & selectedImage !== null) {

                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        user.clubs = newClubsArray

                                    }
                                    else if (descriptioRef === '' & nameRef !== '' & selectedImage !== null) {

                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.title = nameRef
                                        user.clubs = newClubsArray

                                    }
                                    else if (nameRef === '' & descriptioRef !== '' & selectedImage !== null) {
                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.description = descriptioRef
                                        user.clubs = newClubsArray

                                    }
                                    else if (selectedImage === null & nameRef !== '' & descriptioRef !== '') {

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                        club.description = descriptioRef
                                    }
                                    else if (selectedImage !== null & nameRef !== '' & descriptioRef !== '') {

                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.description = descriptioRef
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                    }

                                    if (exist) {
                                        if (checked !== club.existChat) {
                                            await changeExists(JSON.stringify({
                                                which: 'chat',
                                                clubId: club.id,
                                                newData: checked
                                            }))
                                        }
                                        if (checked2 !== club.existGrades) {
                                            await changeExists(JSON.stringify({
                                                which: 'grades',
                                                clubId: club.id,
                                                newData: checked2
                                            }))
                                        }
                                        if (checked3 !== JSON.parse(club.clubLeader)) {
                                            await changeExists(JSON.stringify({
                                                which: 'private',
                                                clubId: club.id,
                                                newData: checked3
                                            }))
                                        }
                                    }

                                    await deaf()
                                    await setExist(false)
                                    await setNameRef('')
                                    await setDescriptioRef('')
                                    await setSelectedImage(null)
                                    await setFileName('Change banner')
                                    await setloading(false)
                                    await setSure(false)
                                }

                                function changedTheExist(which) {
                                    setExist(true)
                                    if (which === 1) {
                                        setChecked(!club.existChat)
                                        setChecked2(club.existGrades)
                                        setChecked3(JSON.parse(club.clubLeader))
                                    }
                                    else if (which === 2){
                                        setChecked3(!JSON.parse(club.clubLeader))
                                        setChecked2(club.existGrades)
                                        setChecked(club.existChat)
                                    }
                                    else {
                                        setChecked2(!club.existGrades)
                                        setChecked(club.existChat)
                                        setChecked3(JSON.parse(club.clubLeader))
                                    }
                                }

                                async function chao() {
                                    await setloading(true)
                                    const info = await getUser(whoToExpel)
                                    const toSelect = await info[0]
                                    await exitClub({
                                        userName: toSelect.userName,
                                        clubId: club.id,
                                        userClubs: toSelect.clubs,
                                    })
                                    await deaf()
                                    await setExpeling(false)
                                    await setWhoToExpel('')
                                    await setloading(false)
                                }

                                return club && (
                                    <>
                                        {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                                        <div>
                                            {sure &&
                                                <div className="sureCont">

                                                    <div className="sureSection">

                                                        <h2>Are you sure of the changes?</h2>
                                                        <div>
                                                            <button onClick={changeClub} className="getIn getIn especialButtonSure">Yes, save changes</button>
                                                            <button onClick={() => setSure(false)} className="getIn getIn especialButtonSure red">No, cancel</button>
                                                        </div>
                                                    </div>
                                                    <div className="surebg" onClick={() => setSure(false)}></div>
                                                </div>
                                            }

                                            {expeling &&
                                                <div className="sureCont">

                                                    <div className="formAddEv">
                                                        <div className="xplusTitle">
                                                            <button onClick={() => {
                                                                setExpeling(false)
                                                            }} className="closeButtonFormColendar">
                                                                <img src={close} alt="colse button" />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <h3 className="inputIdentify">Select the member to expel:</h3>
                                                            <select onChange={(evt) => setWhoToExpel(evt.target.value)} className="inputTextSelect" id="mySelect">
                                                                <option>Select:</option>
                                                                {club.members.map(member => {

                                                                    return (
                                                                        <option value={member}>{member}</option>

                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <button disabled={whoToExpel === '' || whoToExpel === 'Select:'} onClick={() => chao()} className="DelExi">
                                                            Expel member
                                                        </button>

                                                    </div>
                                                    <div className="surebg" onClick={() => {
                                                        setExpeling(false)
                                                    }}></div>
                                                </div>
                                            }

                                            <NavClub userClubs={userClubs} deafUs={deafUs} user={user} club={club} main={4} />


                                            <div className="Log">

                                                <div className="pasd">
                                                    <form onSubmit={(evt) => {
                                                        evt.preventDefault()
                                                        setSure(true)
                                                    }} className="formLogin">
                                                        <div className="headerErr">
                                                            <h1 className="h1LogCards">Club settings</h1>
                                                            <h3 className="errorAnoun"> {err}</h3>
                                                        </div>
                                                        <div>
                                                            <h2 className="inputIdentify">Change club name:</h2>
                                                            <input id='changeTitle' value={nameRef} onChange={(evt) => setNameRef(evt.target.value)} className="inputText" type="text" placeholder={club.title} />
                                                        </div>
                                                        <div>
                                                            <h2 className="inputIdentify">Change description:</h2>
                                                            <textarea id="changeDescription" value={descriptioRef} onChange={(evt) => setDescriptioRef(evt.target.value)} className="textArea" placeholder={club.description} />
                                                        </div>
                                                        {exist ?
                                                            <div className="boxesCont">
                                                                <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Have chat</h5>
                                                                    <input className="box" onChange={handleClick} checked={checked} type="checkbox" />
                                                                </label>
                                                                <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Have grades</h5>
                                                                    <input className="box" onChange={handleClick2} checked={checked2} type="checkbox" />
                                                                </label>
                                                                <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Private</h5>
                                                                    <input className="box" onChange={handleClick3} checked={checked3} type="checkbox" />
                                                                </label>
                                                            </div>
                                                            :
                                                            <div className="boxesCont">
                                                                <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Have chat</h5>
                                                                    <input className="box" onChange={() => changedTheExist(1)} checked={club.existChat} type="checkbox" />
                                                                </label>
                                                                {/* <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Have grades</h5>
                                                                    <input className="box" onChange={() => changedTheExist()} checked={club.existGrades} type="checkbox" />
                                                                </label> */}
                                                                <label className="labelForBoxes">
                                                                    <h5 className="TextOfBoxes">Private</h5>
                                                                    <input className="box" onChange={() => changedTheExist(2)} checked={JSON.parse(club.clubLeader)} type="checkbox" />
                                                                </label>
                                                            </div>
                                                        }
                                                        <div className="ExpelPlusSave">
                                                            <button disabled={(nameRef.replaceAll(' ', '').length === 0 & descriptioRef.replaceAll(' ', '').length === 0) & selectedImage === null & exist === false} className="getIn logInButton">Save changes</button>
                                                            <button disabled={club.members.length === 0} style={{ margin: 0 }} type='button' onClick={() => setExpeling(true)} className="DelExi">Expel a member</button>
                                                        </div>
                                                    </form>

                                                </div>
                                                <div className="ImgChanger">
                                                    <h2 className="inputIdentify">Club banner:</h2>
                                                    <div className='userLogoSettings'>
                                                        {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' /> : <img src={BannersImg + club.clubBanner} alt='CLub banner' />}
                                                    </div>

                                                    <div className="container-input">
                                                        <input type="file"

                                                            name="myImage"
                                                            onChange={(event) => {
                                                                setErr('')
                                                                if (event.target.files[0] !== undefined) {
                                                                    const fileSize = event.target.files[0].size;
                                                                    if (fileSize < 10000000) {
                                                                        setFileName(event.target.files[0].name)
                                                                        setSelectedImage(event.target.files[0]);
                                                                    }
                                                                    else {
                                                                        setErr('File is bigger than the expected size')
                                                                    }
                                                                }

                                                            }} id="myImage" className="inputfile inputfile-1" accept="image/png, image/jpeg" />
                                                        <label className="buttonForSelectImg" htmlFor="myImage">
                                                            <svg className="iborrainputfile" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                                            <span className="iborrainputfile">{fileName}</span>
                                                        </label>

                                                        <button onClick={(evt) => {
                                                            evt.preventDefault()
                                                            setFileName('Change banner')
                                                            setSelectedImage(null)

                                                        }} className="getIn mtop">Delete banner</button>
                                                    </div>

                                                </div>
                                            </div>
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
export default ClubSettings
