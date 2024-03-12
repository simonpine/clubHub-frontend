import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import User from "../components/user"
import noTasks from '../img/empty.png'
import close from '../img/close.png'
import deleteImg from '../img/delete.png'
import plusImg from '../img/plus.png'
import { addRes, addSurveyToServer, surveysBanner, deleteSurvey } from "../api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Surveys() {
    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    const formData = new FormData()
    const [sure, setSure] = useState(false)
    const [res, setRes] = useState([])
    const [titleRef, setTitleRef] = useState('')
    const [currentAnswering, setCurrentAnswering] = useState(null)
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

        copy.forEach(item => {
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

    function changeAnswerRes(idQuestion, idAnswer) {
        const copy = []
        if (res.length === 0) {
            for (let i = 0; i < currentAnswering.answers.length; i++) {
                const oneObj = {
                    id: currentAnswering.answers[i].id,
                    question: currentAnswering.answers[i].question,
                    options: [],
                }
                for (let j = 0; j < currentAnswering.answers[i].options.length; j++) {
                    const twoObj = {
                        id: currentAnswering.answers[i].options[j].id,
                        answer: currentAnswering.answers[i].options[j].answer,
                        votes: currentAnswering.answers[i].options[j].votes,
                    }
                    if (idAnswer === currentAnswering.answers[i].options[j].id) twoObj.votes += 1
                    oneObj.options.push(twoObj)
                }
                copy.push(oneObj)
            }
        }
        else {
            for (let i = 0; i < res.length; i++) {
                const oneObj = {
                    id: res[i].id,
                    question: res[i].question,
                    options: [],
                }
                for (let j = 0; j < res[i].options.length; j++) {

                    let twoObj
                    if (idQuestion === res[i].id) {
                        twoObj = {
                            id: currentAnswering.answers[i].options[j].id,
                            answer: currentAnswering.answers[i].options[j].answer,
                            votes: currentAnswering.answers[i].options[j].votes,
                        }

                        if (idAnswer === res[i].options[j].id) twoObj.votes += 1
                    }
                    else {
                        twoObj = {
                            id: res[i].options[j].id,
                            answer: res[i].options[j].answer,
                            votes: res[i].options[j].votes,
                        }
                    }
                    oneObj.options.push(twoObj)

                }
                copy.push(oneObj)
            }
        }
        setRes(copy)
    }

    return (
        <ContextUser.Consumer>
            {({ user, userClubs, deafUs }) => {


                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, polls, deaf }) => {
                                async function submitSurvey(evt) {
                                    await evt.preventDefault()
                                    const idForUpload = await Math.random().toString(36).substr(2, 32)
                                    const UploadFile = await renameFile(selectedImage, `${club.id}-survey-${idForUpload}`)

                                    await formData.append('image', UploadFile)
                                    await formData.append('clubId', club.id)

                                    const answers = await []

                                    const copy = [...currentSurvey]
                                    for (let i = 0; i < copy.length; i++) {
                                        const oneObj = {
                                            id: copy[i].id,
                                            question: copy[i].question,
                                            options: [],
                                        }
                                        for (let j = 0; j < copy[i].options.length; j++) {
                                            const twoObj = {
                                                id: copy[i].options[j].id,
                                                answer: copy[i].options[j].answer,
                                                votes: 0,
                                            }
                                            oneObj.options.push(twoObj)
                                        }
                                        answers.push(oneObj)
                                    }

                                    const newSurvey = await {
                                        id: idForUpload,
                                        banner: UploadFile.name,
                                        questionary: currentSurvey,
                                        title: titleRef,
                                        answers,
                                        whoAnswered: [],
                                    }

                                    await formData.append('polls', JSON.stringify([...polls, newSurvey]))

                                    await addSurveyToServer(formData)
                                    await setCurrentSurvey(
                                        [
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
                                        ]
                                    )
                                    await setTitleRef('')
                                    await setSelectedImage(null)
                                    await setSure(false)
                                    await deaf()
                                }

                                async function submitAnswers(evt) {
                                    await evt.preventDefault()
                                    await addRes(JSON.stringify({
                                        clubId: club.id,
                                        newAnswers: res,
                                        pollId: currentAnswering.id,
                                        userAns: user.userName
                                    }))
                                    setCurrentAnswering(null)
                                    setRes([])
                                    deaf()
                                }
                                async function deleteSurveyButton() {
                                    await deleteSurvey(JSON.stringify({
                                        clubId: club.id,
                                        pollId: currentAnswering.id
                                    }))

                                    await setCurrentAnswering(null)
                                    await setRes([])
                                    await deaf()
                                }
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
                                                                        Math.floor(Math.random() * 1000000) === 666666 ? setErr('File is nigger than the expected color') : setErr('File is bigger than the expected size')
                                                                    }
                                                                }

                                                            }} id="myImage" className="inputfileSet inputfile-1" accept="image/png, image/jpeg" />
                                                        <label htmlFor="myImage" id="myImaasdge">
                                                            {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='_Users logo' /> : <>Select a banner</>}
                                                        </label>
                                                        <div className="asdasdContainer">
                                                            <h2 className="inputIdentify">Survey title:</h2>
                                                            <input required id="NewUserNamee" value={titleRef} onChange={(evt) => setTitleRef(evt.target.value)} className="inputText" type="text" placeholder='Most popular pet' />
                                                            <h3 className="errorAnoun">{err}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="questionsContainer">
                                                        {currentSurvey.map((item, index) => {

                                                            return (
                                                                <div key={item.id} className="cardSurveyQuestion">
                                                                    <div className="QuestionPlusDelete">
                                                                        <input value={item.question} onChange={(evt) => { changeQuestion(item.id, evt.target.value) }} placeholder={"Question " + Number(index)} required type="text" className="QuestionInput" />
                                                                        <button className="ButtonDeleteQuestion" type="button" onClick={() => deleteQuestion(item.id)} disabled={currentSurvey.length < 2} ><img alt="Trash icon " src={deleteImg} /></button>
                                                                    </div>
                                                                    <div className="AnswersContainer">
                                                                        {item.options.map(ans =>
                                                                            <div key={ans.id} className="AnswerContainer">
                                                                                <input value={ans.answer} onChange={(evt) => changeAnswer(item.id, ans.id, evt.target.value)} required className="inputAnswer" placeholder="Answer" />
                                                                                <button onClick={() => deleteAnswer(item.id, ans.id)} disabled={item.options.length < 3} className="delteAnsButton"><img src={close} alt="x icon" /></button>
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
                                                        <button type="submit" disabled={selectedImage === null || titleRef === ''} className="getIn logInButton mNone">Save survey</button>

                                                    </div>
                                                </form>

                                                <div className="surebg" onClick={() => setSure(false)}></div>
                                            </div>
                                        }
                                        {currentAnswering !== null &&
                                            <div className="sureCont">
                                                <form onSubmit={submitAnswers} className="CreateSurveySection">
                                                    <div className="xplusTitle">
                                                        <button type="button" onClick={() => {
                                                            setCurrentAnswering(null)
                                                            setRes([])
                                                        }} className="closeButtonFormColendar">
                                                            <img src={close} alt="colse button" />
                                                        </button>
                                                        <h3 className="cardTitleUSer">{currentAnswering.title}</h3>
                                                    </div>
                                                    {club.clubOwner === user.userName ?
                                                        <>
                                                            {currentAnswering.answers.length === 0 ?
                                                                <h2 className="NoOne">No one has answered the questionnaire</h2>
                                                                :
                                                                <div className="showCharts">
                                                                    {currentAnswering.answers.map(answer => {
                                                                        const data = []

                                                                        answer.options.forEach(it => {
                                                                            data.push({
                                                                                name: it.answer,
                                                                                Votes: it.votes
                                                                            })
                                                                        })
                                                                        return (
                                                                            <div className="ChartPlusTitleContainer" key={answer.id}>
                                                                                <h2>{answer.question}</h2>
                                                                                <div className="chartCont">
                                                                                    <ResponsiveContainer width="100%" height="100%">
                                                                                        <BarChart data={data}>
                                                                                            <XAxis dataKey="name" stroke="#ffffff00" />
                                                                                            <YAxis />
                                                                                            <Tooltip itemStyle={{ backgroundColor: '#0c0c0c' }} wrapperStyle={{ backgroundColor: '#0c0c0c' }} contentStyle={{ backgroundColor: '#0c0c0c' }} />
                                                                                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                                                                            <Bar dataKey="Votes" fill="#d6ad7b" barSize={30} />
                                                                                        </BarChart>
                                                                                    </ResponsiveContainer>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}

                                                                </div>
                                                            }

                                                            <button onClick={() => deleteSurveyButton()} className="DelExi" type="button">Delete survey</button>
                                                        </>
                                                        :
                                                        <div className="questionsContainer">
                                                            {currentAnswering.questionary.map((item, index) => {
                                                                return (
                                                                    <div className="cardSurveyQuestion" key={item.id}>
                                                                        <h3 className="questions">{index + 1} {item.question}</h3>
                                                                        <div>
                                                                            {item.options.map(ans => {
                                                                                return (
                                                                                    <div key={ans.id} className="inpPlusLabel">
                                                                                        <input onClick={() => changeAnswerRes(item.id, ans.id)} required id={ans.id} name={item.id} type="radio" />
                                                                                        <label htmlFor={ans.id}>{ans.answer}</label>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <button type="submit" className="getIn logInButton">Submit</button>
                                                        </div>
                                                    }
                                                </form>

                                                <div className="surebg" onClick={() => {
                                                    setCurrentAnswering(null)
                                                    setRes([])
                                                }}></div>
                                            </div>
                                        }
                                        <NavClub user={user} club={club} main={6} userClubs={userClubs} deafUs={deafUs} />
                                        {polls.length === 0 ?
                                            <div className="EmptySurveysCont">
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
                                            </div>
                                            :
                                            <div className="clubSurveysContainer">
                                                {polls.map(item => {
                                                    return (
                                                        <div className="cardSurvey" key={item.id}>
                                                            <img alt="Survey banner" src={surveysBanner + item.banner} />
                                                            <h3>{item.title}</h3>
                                                            <h4>{item.questionary.length} {item.questionary.length > 1 ? <>questions</> : <>question</>}</h4>
                                                            <button disabled={item.whoAnswered.some(it => it === user.userName)} onClick={() => setCurrentAnswering(item)} className="getIn logInButton">{club.clubOwner === user.userName ? <>Results</> : item.whoAnswered.some(it => it === user.userName) ? <>Answered</> : <>Fill out</>}</button>
                                                        </div>
                                                    )
                                                })}
                                                {club.clubOwner === user.userName &&
                                                    <div className="cardSurveySpecial">
                                                        <button className="addSurveyInCardButton" onClick={() => setSure(true)}><img src={plusImg} alt="Plus Button icon" /></button>
                                                    </div>
                                                }
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