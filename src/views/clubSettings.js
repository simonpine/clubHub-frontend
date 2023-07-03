import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import { BannersImg, editClub } from "../api"
import User from "../components/user"
function ClubSettings() {
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
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
            {({ user }) => {
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club }) => {

                                async function changeClub(evt) {
                                    await evt.preventDefault();
                                    await await setloading2(true)
                                    await setloading(true)

                                    if (nameRef === '' & selectedImage === null) {

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
                                    else if (descriptioRef === '' & selectedImage === null) {


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
                                    else if (descriptioRef === '' & nameRef === '') {

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
                                    else if (descriptioRef === '') {

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
                                    else if (nameRef === '') {
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
                                    else if (selectedImage === null) {

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
                                    else {
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


                                    await setNameRef('')
                                    await setDescriptioRef('')
                                    await setSelectedImage(null)
                                    await setFileName('Change banner')
                                    await setloading(false)
                                    await setloading2(false)
                                    await setSure(false)
                                }

                                return club && (
                                    <div>
                                        {sure &&
                                            <div className="sureCont">

                                                <div className="sureSection">

                                                    <h2>Are you sure of the changes?</h2>
                                                    <div>
                                                        <button onClick={changeClub} className="getIn">Yes, save changes</button>
                                                        <button onClick={() => setSure(false)} className="getIn red">No, cancel</button>
                                                    </div>
                                                </div>
                                                {loading2 && <div className="sureSection loadingSure"><div className="lds-dual-ring"></div></div>}

                                                <div className="surebg" onClick={() => setSure(false)}></div>
                                            </div>
                                        }

                                        <NavClub user={user} club={club} main={4} />


                                        <div className="Log">

                                            <div className="pasd">
                                                {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

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
                                                    <button disabled={(nameRef.replaceAll(' ', '').length === 0 & descriptioRef.replaceAll(' ', '').length === 0) & selectedImage === null} className="getIn logInButton">Save changes</button>
                                                </form>

                                            </div>
                                            <div className="ImgChanger">
                                                <h2 className="inputIdentify">Club banner</h2>
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
                                                                if (fileSize < 700000) {
                                                                    setFileName(event.target.files[0].name)
                                                                    setSelectedImage(event.target.files[0]);
                                                                }
                                                                else {
                                                                    setErr('File is bigger than the expected size')
                                                                }
                                                            }

                                                        }} id="myImage" className="inputfile inputfile-1" accept="image/png, image/jpeg" />
                                                    <label htmlFor="myImage">
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