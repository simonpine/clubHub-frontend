import { ContextUser } from "../context/userContext"
import { redirect, useNavigate } from "react-router-dom";
import clubHub from '../img/clubHub.svg';
import { useEffect } from "react";
import { Link } from "react-router-dom";
function LogIn() {
    const navigate = useNavigate();
    return (
        <ContextUser.Consumer>
            {({ user }) => {
                if (user !== null) {
                    redirect("/home")
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
                            <form className="formLogin">
                                <h1 className="h1LogCards">Welcome</h1>
                                <div className="sectionFormCont">
                                    <h2 className="inputIdentify">User:</h2>
                                    <input className="inputText" type="text" placeholder="SimonPine" />
                                    <Link className="thirButton">Do you not have an account?</Link>
                                </div>
                                <div className="sectionFormCont">
                                    <h2 className="inputIdentify">Password:</h2>
                                    <input className="inputText" type="password" placeholder="******" />
                                    <Link className="thirButton">Forgot password?</Link>
                                </div>
                                <button className="getIn logInButton">Log in</button>
                            </form>
                        </div>
                    </div>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default LogIn