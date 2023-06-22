import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserName, putUser } from "../api";
function NewAccount() {
    const [loading, setloading] = useState(false)
    const [err, setErr] = useState('')

    const [nameRef, setNameRef] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')

    const [quiestionRef, setQuestionRef] = useState('')
    const [answerRef, setAnswerRef] = useState('')
    const [confirmAnswerRef, setConfirmAnswerRef] = useState('')
    const navigate = useNavigate();
    const md5 = require('md5')
    return (
        <ContextUser.Consumer>
            {() => {

                async function CreateFunction(evt) {
                    evt.preventDefault();
                    setloading(true)
                    setErr(false)
                    const [userName] = await getUserName(nameRef)
                    // console.log(userName)
                    if (userName !== undefined) {
                        setErr('The username is already taken')
                    }
                    else if (passwordRef !== confirmPasswordRef || answerRef !== confirmAnswerRef) {
                        setErr('The password/answer do not match')
                    }
                    else {
                        await putUser(nameRef, md5(passwordRef), quiestionRef, md5(answerRef))
                        await navigate(-1)
                    }
                    await setloading(false)
                }

                return (
                    <div>
                        <div className='LogInNav'>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>
                        <div className="Log">
                            {loading && <div className="loadingCont CreateCont"><div className="lds-dual-ring"></div></div>}

                            <form onSubmit={CreateFunction} className="CreateCont">
                                <div className="headerErr">
                                    <h1 className="h1LogCards">Welcome</h1>
                                    <h3 className="errorAnoun">{err}</h3>
                                </div>
                                <div className="inputsContainerCreateUser">
                                    <div className="sectionInputCreateUser">
                                        <div>
                                            <h2 className="inputIdentify">Username:</h2>
                                            <input value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder="SimonPine" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Password:</h2>
                                            <input value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm password:</h2>
                                            <input value={confirmPasswordRef} onChange={(evt) => setConfirmPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                    </div>
                                    <div className="sectionInputCreateUser">
                                        <div>
                                            <h2 className="inputIdentify">Recovey question:</h2>
                                            <input value={quiestionRef} onChange={(evt) => setQuestionRef(evt.target.value)} className="inputText" type="text" placeholder="Name of your first pet" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Answer:</h2>
                                            <input value={answerRef} onChange={(evt) => setAnswerRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm answer:</h2>
                                            <input value={confirmAnswerRef} onChange={(evt) => setConfirmAnswerRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                    </div>
                                </div>
                                <button disabled={nameRef.length === 0 || passwordRef.length === 0 || confirmPasswordRef.length === 0 || quiestionRef.length === 0 || answerRef.length === 0 || confirmAnswerRef.length === 0} className="getIn logInButton">Create</button>

                            </form>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default NewAccount