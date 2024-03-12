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

    const [quiestionRef, setQuestionRef] = useState('Select a quiestion:')
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
                        setErr('The mail is already on use')
                    }
                    else if(!nameRef.includes("@uniandes.edu.co")  && !nameRef.includes("@urosario.edu.co")){
                        setErr('Is not a universiti mail')
                    }
                    else if (nameRef.length > 45) {
                        setErr('The mail cannot have more than 45 characters')
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
                        {loading && <div className="loadingContSpe"><div className="lds-dual-ring"></div></div>}
                        <div className="Log">
                            <form onSubmit={CreateFunction} className="CreateCont">
                                <div className="headerErr">
                                    <h1 className="h1LogCards">Create account</h1>
                                    <h3 className="errorAnoun">{err}</h3>
                                </div>
                                <div className="inputsContainerCreateUser">
                                    <div className="sectionInputCreateUser">
                                        <div>
                                            <h2 className="inputIdentify">Mail:</h2>
                                            <input id="NewUserName" value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder="example@uniandes.edu.co" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Password:</h2>
                                            <input id="Password" value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm password:</h2>
                                            <input id="PasswordConfirm" value={confirmPasswordRef} onChange={(evt) => setConfirmPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                    </div>
                                    <div className="sectionInputCreateUser">
                                        <div>
                                            <h2 className="inputIdentify">Recovery question:</h2>
                                            <select id="mySelect" onChange={(evt) => {
                                                setQuestionRef(evt.target.value)
                                            }} className="inputTextSelect">
                                                <option>Select a question:</option>
                                                <option>What was the name of your first teacher?</option>
                                                <option>What is the name of your favorite childhood friend?</option>
                                                <option>In which city were you born?</option>
                                                <option>What is the name of your maternal grandmother?</option>
                                                <option>What was the model of your first car?</option>
                                                <option>What is the name of the street you grew up on?</option>
                                                <option>What was the name of the first book you read as a child?</option>
                                                <option>What is your favorite movie?</option>
                                                <option>In which city did you have your first job?</option>
                                                <option value='What was the name of your childhood hero?'>What was the name of your childhood hero?</option>
                                                <option value='Name of your first pet'>What was the name of your first pet?</option>
                                            </select>
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Answer:</h2>
                                            <input id="answer" value={answerRef} onChange={(evt) => setAnswerRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm answer:</h2>
                                            <input id="answerConfirm" value={confirmAnswerRef} onChange={(evt) => setConfirmAnswerRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                    </div>
                                </div>
                                <button disabled={nameRef.length === 0 || passwordRef.length === 0 || confirmPasswordRef.length === 0 || quiestionRef === 'Select a quiestion:' || answerRef.length === 0 || confirmAnswerRef.length === 0} className="getIn logInButton">Create</button>

                            </form>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default NewAccount