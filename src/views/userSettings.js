import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userPng from '../img/user.png'
import { getUser, editUser, uploadFile, usersImg } from "../api";
function ForgotPasswordRecover() {
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)

    const [err, setErr] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [descriptionRef, setDescriptionRef] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);


    const [sure, setSure] = useState(false)

    const navigate = useNavigate();
    const md5 = require('md5')

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    async function changeData(evt) {
        evt.preventDefault();
        await setloading(true)
        setErr('')

        if (passwordRef !== confirmPasswordRef) {
            await setErr('The password do not match')
        }
        else if (nameRef.length > 45) {
            setErr('The username cannot have more than 45 characters')
        }
        else if (nameRef.length !== 0) {
            const [res] = await getUser(nameRef)
            if (res === undefined) {
                setSure(true)
            }
            else {
                setErr('that username is already taken')
            }
        }
        else {
            setSure(true)
        }
        await setloading(false)

    }
    const formData = new FormData()
    return (
        <ContextUser.Consumer>
            {({ user }) => {
                async function setTheData(evt) {
                    await evt.preventDefault();
                    await setloading2(true)
                    if (descriptionRef !== '') {
                        await editUser(user.userName, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, descriptionRef, user.userName)
                        user.description = await descriptionRef
                    }

                    if (nameRef !== '' || selectedImage !== null || passwordRef !== '') {
                        if (nameRef === '' & selectedImage === null & passwordRef !== '') {
                            await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                            user.pasword = await md5(passwordRef)
                        }
                        else if (passwordRef === '' & selectedImage === null & nameRef !== '') {
                            await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.description, user.userName)
                            await localStorage.setItem('user', JSON.stringify(nameRef))
                            user.userName = await nameRef
                        }
                        else if (passwordRef === '' & nameRef === '' & selectedImage !== null) {
                            const UploadFile = await renameFile(selectedImage, user.userName)
                            await formData.append('image', UploadFile)
                            await formData.append('name', user.userName)
                            await formData.append('old', user.userImg)
                            user.userImg = await (UploadFile.name)
                            await uploadFile(formData)

                        }
                        else if (passwordRef === '' & nameRef !== '' & selectedImage !== null) {
                            const UploadFile = await renameFile(selectedImage, nameRef)
                            await formData.append('image', UploadFile)
                            await formData.append('name', nameRef)
                            await formData.append('old', user.userImg)

                            await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.description, user.userName)
                            await localStorage.setItem('user', JSON.stringify(nameRef))
                            await uploadFile(formData)

                            user.userName = await nameRef
                            user.userImg = await (UploadFile.name)

                        }
                        else if (nameRef === '' & passwordRef !== '' & selectedImage !== null) {
                            const UploadFile = await renameFile(selectedImage, user.userName)
                            await formData.append('image', UploadFile)
                            await formData.append('name', user.userName)
                            await formData.append('old', user.userImg)

                            await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                            await uploadFile(formData)

                            user.pasword = await md5(passwordRef)
                            user.userImg = await (UploadFile.name)
                        }
                        else if (selectedImage === null & nameRef !== '' & passwordRef !== '') {
                            await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                            await localStorage.setItem('user', JSON.stringify(nameRef))

                            user.pasword = await md5(passwordRef)
                            user.userName = await nameRef
                        }
                        else {
                            const UploadFile = await renameFile(selectedImage, nameRef)
                            await formData.append('image', UploadFile)
                            await formData.append('name', nameRef)
                            await formData.append('old', user.userImg)

                            await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                            await localStorage.setItem('user', JSON.stringify(nameRef))
                            await uploadFile(formData)

                            user.userImg = await (UploadFile.name)
                            user.pasword = await md5(passwordRef)
                            user.userName = await nameRef
                        }
                    }


                    await setNameRef('')
                    await setDescriptionRef('')
                    await setConfirmPasswordRef('')
                    await setPasswordRef('')
                    await setSelectedImage(null)
                    await navigate('/home')

                }
                return user && (
                    <div>
                        <div className='LandingNav '>
                            <button onClick={() => {
                                localStorage.clear()
                                navigate('/')
                            }} className='getIn logOutButton'>Log out</button>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>
                        {sure &&
                            <div className="sureCont">

                                <div className="sureSection">

                                    <h2>Are you sure of the changes?</h2>
                                    <div>
                                        <button onClick={setTheData} className="getIn especialButtonSure">Yes, save changes</button>
                                        <button onClick={() => setSure(false)} className="getIn especialButtonSure red">No, cancel</button>
                                    </div>
                                </div>
                                {loading2 && <div className="sureSection loadingSure"><div className="lds-dual-ring"></div></div>}

                                <div className="surebg" onClick={() => setSure(false)}></div>
                            </div>
                        }
                        <div className="Log revers">
                            {/* <div className="pasd"> */}
                            {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                            <form onSubmit={changeData} className="CreateCont CreateContSettings">
                                <div className="headerErr">
                                    <h1 className="h1LogCards">Settings</h1>
                                    <h3 className="errorAnoun"> {err}</h3>
                                </div>
                                <div className="inputsConter">
                                    <div className="sec">
                                        <div>
                                            {/* <h2 className="inputIdentify">Profile picture:</h2> */}
                                            <div>
                                                <input type="file"
                                                    name="myImage"
                                                    onChange={(event) => {
                                                        setErr('')
                                                        if (event.target.files[0] !== undefined) {
                                                            const fileSize = event.target.files[0].size;
                                                            if (fileSize < 700000) {
                                                                setSelectedImage(event.target.files[0]);
                                                            }
                                                            else {
                                                                Math.floor(Math.random() * 500000) === 666666 ? setErr('File is nigger than the expected size') : setErr('File is bigger than the expected size')
                                                            }
                                                        }

                                                    }} id="myImage" className="inputfileSet inputfile-1" accept="image/png, image/jpeg" />
                                                <label htmlFor="myImage" className="myImage">
                                                    {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' /> : user.userImg ? <img src={usersImg + user.userImg} alt='_Users logo' /> : <img src={userPng} alt='_Users logo' />}
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Change description:</h2>
                                            <textarea id="descriptionArea" onChange={(evt) => setDescriptionRef(evt.target.value)} className="textArea" placeholder={user.description} />
                                        </div>

                                    </div>
                                    <div className="sec">
                                        <div>
                                            <h2 className="inputIdentify">Change username:</h2>
                                            <input id="NewUserNamee" value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder={user.userName} />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Change password:</h2>
                                            <input id="NewPassword" value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm password:</h2>
                                            <input id="NewPasswordConfirm" value={confirmPasswordRef} onChange={(evt) => setConfirmPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                    </div>

                                </div>
                                <button disabled={(confirmPasswordRef.length === 0 || passwordRef.length === 0) & (nameRef.length === 0) & selectedImage === null & descriptionRef.length === 0} className="getIn logInButton">Save changes</button>
                            </form>
                        </div>

                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ForgotPasswordRecover