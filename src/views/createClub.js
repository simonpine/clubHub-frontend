
import { ContextUser } from "../context/userContext"
import { Link } from "react-router-dom"
import userPng from '../img/user.png'
import { usersImg } from "../api"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { newClub } from "../api";

function CreateClub() {
    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [descriptioRef, setDescriptioRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [fileName, setFileName] = useState('Upload photo')

    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

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
                async function changeData(evt) {
                    evt.preventDefault();
                    await setloading(true)
                    setErr('')
                    if (nameRef.replaceAll(' ', '').length === 0 || descriptioRef.replaceAll(' ', '').length === 0) {
                        setErr('The name/description cannot be empty')
                    }
                    else {
                        const idForUpload = Math.random().toString(36).substr(2, 32)

                        formData.append('image', renameFile(selectedImage, idForUpload))
                        formData.append('id', idForUpload)
                        formData.append('title', nameRef)
                        formData.append('description', descriptioRef)
                        formData.append('grades', JSON.stringify([]))
                        formData.append('members', JSON.stringify([]))
                        formData.append('currtentClubs', user.clubs)
                        formData.append('clubOwner', user.userName)

                        await newClub(formData)
                        await window.location.reload(false)
                    }


                    await setloading(false)

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
                        <div className="Log">
                            <div>
                                {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                                <form onSubmit={changeData} className="formLogin">
                                    <div className="headerErr">
                                        <h1 className="h1LogCards">Create Club</h1>
                                        <h3 className="errorAnoun"> {err}</h3>
                                    </div>
                                    <div>
                                        <h2 className="inputIdentify">Club name:</h2>
                                        <input value={nameRef} onChange={(evt) => setNameRef(evt.target.value)} className="inputText" type="text" placeholder='Cinema club' />
                                    </div>
                                    <div>
                                        <h2 className="inputIdentify">Description:</h2>
                                        <textarea value={descriptioRef} onChange={(evt) => setDescriptioRef(evt.target.value)} className="textArea" placeholder="A cinema club is a gathering of film enthusiasts who come together to watch and discuss movies. It provides a space for like-minded individuals to share their love for cinema, explore different genres, and engage in meaningful conversations about films." />
                                    </div>
                                    <button disabled={(descriptioRef.length === 0) || (nameRef.length === 0) || selectedImage === null} className="getIn logInButton">Create</button>
                                </form>

                            </div>
                            <div className="ImgChanger">
                                <h2 className="inputIdentify">Club banner</h2>
                                <div className='userLogoSettings'>
                                    {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' />}
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
                                                    setErr('File size is huge')
                                                }
                                            }

                                        }} id="myImage" className="inputfile inputfile-1" accept="image/png, image/jpeg" />
                                    <label htmlFor="myImage">
                                        <svg className="iborrainputfile" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                        <span className="iborrainputfile">{fileName}</span>
                                    </label>

                                    <button onClick={(evt) => {
                                        evt.preventDefault()
                                        setFileName('Upload photo')
                                        setSelectedImage(null)

                                    }} className="getIn">Delete photo</button>
                                </div>

                            </div>
                        </div>

                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default CreateClub