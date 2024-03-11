import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import clubHub from '../img/clubHub.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api";

function LogIn() {
    const [loading, setloading] = useState(false)
    const [err, setErr] = useState(false)
    const [nameRef, setNameRef] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const navigate = useNavigate();
    const md5 = require('md5')
    return (
        <>
            {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}

            <ContextUser.Consumer>
                {({ saveUser }) => {
                    async function LogInFunction(evt) {
                        evt.preventDefault();
                        await setloading(true)
                        setErr(false)
                        const res = await getUser(nameRef)
                        if (res.length === 0 || res[0].pasword !== md5(passwordRef)) {
                            setErr(true)
                        }
                        else {
                            await saveUser(res[0])
                        }
                        await setloading(false)
                    }
                    return (
                        <div>
                            <div className='LogInNav'>
                                <button onClick={() => navigate('/')} className='getIn'>Return</button>
                            </div>
                            <div className="Log">
                                <div className="LoadingAndFormCont">
                                    <form onSubmit={LogInFunction} className="formLogin">
                                        <div className="headerErr">
                                            <h1 className="h1LogCards">Welcome</h1>
                                            <h3 className="errorAnoun"> {err ? <>Invalid username/password</> : <></>}</h3>

                                        </div>

                                        <div className="sectionFormCont">
                                            <h2 className="inputIdentify">Mail:</h2>
                                            <input id="UserName" value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder="example@uniandes.edu.co" />
                                        </div>
                                        <div className="sectionFormCont">
                                            <h2 className="inputIdentify">Password:</h2>
                                            <input id="password" value={passwordRef} onChange={(evt) => setPasswordRef(evt.target.value.replace(' ', ''))} className="inputText" type="password" placeholder="******" />
                                        </div>
                                        <button disabled={nameRef.length === 0 || passwordRef.length === 0} className="getIn logInButton">Log in</button>
                                        <div className="forgotAndCreateCont">
                                            <Link to={{
                                                pathname: "/forgotPassword",
                                            }} className="thirButton">Forgot password?</Link>
                                            -or-
                                            <Link to={{
                                                pathname: "/newAccount",
                                            }} className="thirButton">Not have an account?</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className='logoLogin'>
                                    <img src={clubHub} alt='clubHub, app logo' />
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ContextUser.Consumer>
        </>
    )
}
export default LogIn