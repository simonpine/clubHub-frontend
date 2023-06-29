import { ContextUser } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import clubHub from '../img/clubHub.svg';
import { useState } from "react";
function ForgotPassword() {
    const [loading, setloading] = useState(false)
    const [nameRef, setNameRef] = useState('')
    const navigate = useNavigate();
    return (
        <ContextUser.Consumer>
            {({ saveUser }) => {
                async function LogInFunction(evt) {
                    evt.preventDefault();
                    await setloading(true)
                    navigate('/forgotPassword/' + nameRef)
                    await setloading(false)
                }
                return (
                    <div>
                        <div className='LogInNav'>
                            <button onClick={() => navigate(-1)} className='getIn'>Return</button>
                        </div>
                        <div className="Log">
                            <div className='logoLogin'>
                                <img src={clubHub} alt='clubHub, app logo' />
                            </div>
                            <div>
                                {loading && <div className="loadingCont"><div className="lds-dual-ring"></div></div>}
                                <form onSubmit={LogInFunction} className="formRecover1">
                                    <div className="headerErr">
                                        <h1 className="h1LogCards">Recovery</h1>
                                    </div>
                                    <div className="sectionFormCont">
                                        <h2 className="inputIdentify">Username:</h2>
                                        <input id="userName" value={nameRef} onChange={(evt) => setNameRef(evt.target.value.replace(' ', ''))} className="inputText" type="text" placeholder="SimonPine" />
                                    </div>
                                    <button disabled={nameRef.length === 0} className="getIn logInButton">Get question</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ForgotPassword