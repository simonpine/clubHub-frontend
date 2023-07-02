import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, editUser, uploadFile, usersImg } from "../api";
function ForgotPasswordRecover() {
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)

    const [err, setErr] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [fileName, setFileName] = useState('Upload photo')

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
                    if (nameRef === '' & selectedImage === null) {
                        await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.userName)
                        user.pasword = await md5(passwordRef)
                    }
                    else if (passwordRef === '' & selectedImage === null) {
                        await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.userName)
                        await localStorage.setItem('user', JSON.stringify(nameRef))
                        user.userName = await nameRef
                    }
                    else if (passwordRef === '' & nameRef === '') {
                        const UploadFile = await renameFile(selectedImage, user.userName)
                        await formData.append('image', UploadFile)
                        await formData.append('name', user.userName)
                        await formData.append('old', user.userImg)
                        user.userImg = await (UploadFile.name)
                        await uploadFile(formData)

                    }
                    else if (passwordRef === '') {
                        const UploadFile = await renameFile(selectedImage, nameRef)
                        await formData.append('image', UploadFile)
                        await formData.append('name', nameRef)
                        await formData.append('old', user.userImg)

                        await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.userName)
                        await localStorage.setItem('user', JSON.stringify(nameRef))
                        await uploadFile(formData)

                        user.userName = await nameRef
                        user.userImg = await (UploadFile.name)

                    }
                    else if (nameRef === '') {
                        const UploadFile = await renameFile(selectedImage, user.userName)
                        await formData.append('image', UploadFile)
                        await formData.append('name', user.userName)
                        await formData.append('old', user.userImg)

                        await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.userName)
                        await uploadFile(formData)

                        user.pasword = await md5(passwordRef)
                        user.userImg = await (UploadFile.name)
                    }
                    else if (selectedImage === null) {
                        await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.userName)
                        await localStorage.setItem('user', JSON.stringify(nameRef))

                        user.pasword = await md5(passwordRef)
                        user.userName = await nameRef
                    }
                    else {
                        const UploadFile = await renameFile(selectedImage, nameRef)
                        await formData.append('image', UploadFile)
                        await formData.append('name', nameRef)
                        await formData.append('old', user.userImg)

                        await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.userName)
                        await localStorage.setItem('user', JSON.stringify(nameRef))
                        await uploadFile(formData)

                        user.userImg = await (UploadFile.name)
                        user.pasword = await md5(passwordRef)
                        user.userName = await nameRef
                    }


                    await setNameRef('')
                    await setConfirmPasswordRef('')
                    await setPasswordRef('')
                    await setSelectedImage(null)
                    await setFileName('Upload photo')
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
                                        <button onClick={setTheData} className="getIn">Yes, save changes</button>
                                        <button onClick={() => setSure(false)} className="getIn red">No, cancel</button>
                                    </div>
                                </div>
                                {loading2 && <div className="sureSection loadingSure"><div className="lds-dual-ring"></div></div>}

                                <div className="surebg" onClick={() => setSure(false)}></div>
                            </div>
                        }
                        <div className="Log">
                            <div className="ImgChanger">
                                <div className='userLogoSettings'>
                                    {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' /> : user.userImg ? <img src={usersImg + user.userImg} alt='_Users logo' /> : <></>}
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
                                                    Math.floor(Math.random()*500000) === 666666 ?setErr('File is nigger than the expected size')   : setErr('File is bigger than the expected size') 
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
                            <div className="pasd">
                                {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

                                <form onSubmit={changeData} className="formLogin">
                                    <div className="headerErr">
                                        <h1 className="h1LogCards">Settings</h1>
                                        <h3 className="errorAnoun"> {err}</h3>
                                    </div>
                                    <div>
                                        <h2 className="inputIdentify">New username:</h2>
                                        <input id="NewUserNamee" value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder={user.userName} />
                                    </div>
                                    <div>
                                        <h2 className="inputIdentify">New password:</h2>
                                        <input id="NewPassword" value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                    </div>
                                    <div>
                                        <h2 className="inputIdentify">Confirm password:</h2>
                                        <input id="NewPasswordConfirm" value={confirmPasswordRef} onChange={(evt) => setConfirmPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                    </div>
                                    <button disabled={(confirmPasswordRef.length === 0 || passwordRef.length === 0) & (nameRef.length === 0) & selectedImage === null} className="getIn logInButton">Save changes</button>
                                </form>

                            </div>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ForgotPasswordRecover