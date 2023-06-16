import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import clubHub from '../img/clubHub.svg';
import { useState, useEffect } from "react";
import { getUser, editUser } from "../api";
import { useParams } from "react-router-dom";
function ForgotPasswordRecover() {
    const [loading, setloading] = useState(true)

    const [err, setErr] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const [exist, setExist] = useState(false)
    const [myObj, setMyObj] = useState({})
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [answerRef, setAnswerRef] = useState('')
    const navigate = useNavigate();
    const md5 = require('md5')
    const { id } = useParams()

    async function getFullUser() {
        const [res] = await getUser(id)
        if (res !== undefined) {
            setExist(true)
            setQuestion(res['question'])
            setAnswer(res['answer'])
            setMyObj(res)
        }
        await setloading(false)
    }

    useEffect(() => {
        getFullUser()
    }, [])

    return (
        <ContextUser.Consumer>
            {({ saveUser }) => {
                async function LogInFunction(evt) {
                    evt.preventDefault();
                    await setloading(true)
                    setErr('')

                    if(passwordRef !== confirmPasswordRef){
                        setErr('The password do not match')
                    }
                    else if(md5(answerRef) !== answer){
                        setErr('The answer is incorrect')
                    }
                    else{
                        editUser(myObj.userName, JSON.stringify(myObj.clubs), md5(passwordRef), myObj.userImg, myObj.question, myObj.answer)
                        navigate('/login')
                    }
                    await setloading(false)
                }
                return (
                    <div>
                        <div className='LogInNav'>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>
                        <div className="Log log2">
                            <div className='logoLogin'>
                                <img src={clubHub} alt='clubHub, app logo' />
                            </div>
                            <div>
                                {loading && <div className="loadingCont formChangePass"><div className="lds-dual-ring"></div></div>}
                                {exist ?
                                    <form onSubmit={LogInFunction} className="formLogin formChangePass">
                                        <div className="headerErr">
                                            <h1 className="h1LogCards">Recovery</h1>
                                            <h3 className="errorAnoun"> {err}</h3>

                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Question:<div>{question}</div></h2>
                                            {/* <h3 className="inputText borderNone">{question}</h3> */}
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Answer:</h2>
                                            <input value={answerRef} onChange={(evt) => setAnswerRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">New password:</h2>
                                            <input value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <div>
                                            <h2 className="inputIdentify">Confirm password:</h2>
                                            <input value={confirmPasswordRef} onChange={(evt) => setConfirmPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <button disabled={confirmPasswordRef.length === 0 || passwordRef.length === 0 || answerRef.length === 0} className="getIn logInButton">Change password</button>
                                    </form>
                                    :
                                    <h1 className="notReg">
                                        That username is not registered
                                    </h1>
                                }
                            </div>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ForgotPasswordRecover