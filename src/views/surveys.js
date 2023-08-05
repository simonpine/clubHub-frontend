import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import User from "../components/user"
import noTasks from '../img/empty.png'
import close from '../img/close.png'
import deleteImg from '../img/delete.png'

function Surveys() {
    const [sure, setSure] = useState(false)
    const [descriptionRef, setDescriptionRef] = useState('')
    const [titleRef, setTitleRef] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [err, setErr] = useState('')
    const [currentSurvey, setCurrentSurvey] = useState([
        {
            question: '',
            options: [{
                id: Math.floor(Math.random() * 100000),
                answer: ''
            },
            {
                id: Math.floor(Math.random() * 100000),
                answer: ''
            }],
            id: Math.floor(Math.random() * 100000),
        }
    ])
    function addQuestion() {
        setCurrentSurvey([...currentSurvey, {
            question: '',
            options: [{
                id: Math.floor(Math.random() * 100000),
                answer: ''
            },
            {
                id: Math.floor(Math.random() * 100000),
                answer: ''
            }],
            id: Math.floor(Math.random() * 100000),
        }])
    }
    function deleteQuestion(id) {
        const copy = [...currentSurvey]
        setCurrentSurvey(copy.filter(item => item.id !== id))
    }
    function addAnswer(id) {
        const copy = [...currentSurvey]

        copy.map(item => {
            if (item.id === id) {
                return item.options.push({
                    id: Math.floor(Math.random() * 100000),
                    answer: ''
                })
            }
        })
        setCurrentSurvey(copy)
    }
    function deleteAnswer(idQuestion, idAnswer) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                for (let j = 0; j < copy[i].options.length; j++) {
                    if (copy[i].options[j].id === idAnswer) {
                        copy[i].options.splice(j, 1)
                    }
                }
            }
        }
        setCurrentSurvey(copy)
    }
    function changeQuestion(idQuestion, newInfo) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                copy[i].question = newInfo
            }
        }
        setCurrentSurvey(copy)
    }
    function changeAnswer(idQuestion, idAnswer, newInfo) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                for (let j = 0; j < copy[i].options.length; j++) {
                    if (copy[i].options[j].id === idAnswer) {
                        copy[i].options[j].answer = newInfo
                    }
                }
            }
        }
        setCurrentSurvey(copy)
    }
    function submitSurvey(evt) {
        evt.preventDefault()
        console.log(currentSurvey)
    }
    const [currentDescription, setCurrentDescription] = useState('')
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentId, setCurrentId] = useState('')
    return (
        <ContextUser.Consumer>
            {({ user, userClubs, setUserClubs }) => {


                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, polls, setPolls }) => {
                                return club && (

                                    <>
                                        {sure &&
                                            <div className="sureCont">
                                                <form onSubmit={submitSurvey} className="CreateSurveySection">
                                                    <div className="xplusTitle">
                                                        <button type="button" onClick={() => {
                                                            setSure(false)
                                                        }} className="closeButtonFormColendar">
                                                            <img src={close} alt="colse button" />
                                                        </button>
                                                        <h3 className="cardTitleUSer">Create survey</h3>
                                                    </div>
                                                    <div className="titlePlubBAnnerConrt">
                                                        <input required type="file"
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
                                                        <label htmlFor="myImage" id="myImaasdge">
                                                            {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' /> : <>Select a banner</>}
                                                        </label>
                                                        <div>
                                                            <h2 className="inputIdentify">Survey title:</h2>
                                                            <input required id="NewUserNamee" value={titleRef} onChange={(evt) => setTitleRef(evt.target.value)} className="inputText" type="text" placeholder='Change of location' />
                                                        </div>
                                                    </div>
                                                    <div className="questionsContainer">
                                                        {currentSurvey.map((item, index) => {

                                                            return (
                                                                <div key={item.id} className="cardSurveyQuestion">
                                                                    <div className="QuestionPlusDelete">
                                                                        <input value={item.question} onChange={(evt) => { changeQuestion(item.id, evt.target.value) }} placeholder={"Question " + Number(index)} required type="text" className="QuestionInput" />
                                                                        <button className="ButtonDeleteQuestion" type="button" onClick={() => deleteQuestion(item.id)} disabled={currentSurvey.length < 2} ><img src={deleteImg} /></button>
                                                                    </div>
                                                                    <div className="AnswersContainer">
                                                                        {item.options.map(ans =>
                                                                            <div key={ans.id} className="AnswerContainer">
                                                                                <input value={ans.answer} onChange={(evt) => changeAnswer(item.id, ans.id, evt.target.value)} required className="inputAnswer" placeholder="Answer" />
                                                                                <button onClick={() => deleteAnswer(item.id, ans.id)} disabled={item.options.length < 3} className="delteAnsButton"><img src={close} /></button>
                                                                            </div>
                                                                        )}
                                                                        <button className="getIn espCreateEvt logInButton addAnsewr" onClick={() => addAnswer(item.id)} type="button">Add answer</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="butonsTableCont">
                                                        <button className="getIn logInButton" type="button" onClick={addQuestion} >Add question</button>
                                                        <button className="getIn logInButton mNone">Save survey</button>

                                                    </div>
                                                </form>

                                                <div className="surebg" onClick={() => setSure(false)}></div>
                                            </div>
                                        }
                                        <NavClub user={user} club={club} main={6} userClubs={userClubs} setUserClubs={setUserClubs} />
                                        {polls.length === 0 &&
                                            <div className="EmptyMsg">
                                                <div className="allEmptCont">
                                                    <img className="empty" src={noTasks} alt="empty" />
                                                    <h3 className="noH3">No polls assigned yet</h3>
                                                    {club.clubOwner === user.userName &&
                                                        <div className="linksEmp">
                                                            <button style={{
                                                                margin: '0px'
                                                            }} onClick={() => setSure(true)} className="getInCreate">Create a new survey</button>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        }

                                    </>
                                )
                            }}
                        </ContextClub.Consumer>
                    </>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Surveys