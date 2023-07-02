import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import { saveGrades } from "../api"
import ex from '../img/plus.png'
import User from "../components/user"
function ClubGrades() {
    const [loading, setloading] = useState(false)

    const [searchName, setSearchName] = useState('')

    async function saveChanges(id, grades) {
        await setloading(true)
        await saveGrades({
            clubId: id,
            grades: grades,
        })
        await setloading(false)
    }

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user && (
                    <>
                        <div className='LandingNav'>
                            <User lin={user.userImg} />
                        </div>
                        <ContextClub.Consumer>
                            {({ club, grades, setRefresh }) => {

                                function addGrade() {

                                    grades.grades.push('New Grade ' + grades.grades.length)
                                    grades.students.forEach(item => {
                                        item.gardes.push(1)
                                        item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                    })
                                    setRefresh(Math.random)

                                }

                                return club && (
                                    <div>
                                        <NavClub user={user} club={club} main={2} />


                                        <div className="gardesTableContainer">
                                            {loading && <div className="loadingContTable "><div className="lds-dual-ring"></div></div>}
                                            {club.members.length > 0 ?
                                                <>
                                                    <input placeholder="Name filter" className="NameFilterInput" id="SearchByNmae" value={searchName} onChange={(evt) => setSearchName(evt.target.value)} />
                                                    <div className="tableInCont">

                                                        <table>

                                                            <tbody className="bod">
                                                                <tr>
                                                                    <th className="butLine"></th>
                                                                    {
                                                                        grades.students.map(item => {
                                                                            return (item.studentName.toLowerCase()).includes(searchName.toLowerCase()) && (item.studentName !== user.userName ? <th className="butLine" key={item.studentName}>{club.clubOwner !== user.userName ? <h2 className="lesOpp h2InGradesTable">{item.studentName}</h2> : <h2 className="h2InGradesTable">{item.studentName}</h2>}</th> : <th className="butLine" key={item.studentName}><h2 className="h2InGradesTable prinInTale">{item.studentName}</h2></th>)
                                                                        })

                                                                    }
                                                                </tr>

                                                                {club.clubOwner === user.userName ?
                                                                    grades.grades.map((item, index) => {
                                                                        return item !== 'total' && (
                                                                            <tr key={item + index}>
                                                                                <th><input name={item + index} type="text" onChange={(evt) => {
                                                                                    grades.grades[index] = evt.target.value
                                                                                }} className="inputText inputForTable" placeholder={item} /></th>
                                                                                {grades.students.map(item => {
                                                                                    return (item.studentName.toLowerCase()).includes(searchName.toLowerCase()) && <th key={item.studentName + index}><input id={item.studentName + index} type="number" className="inputText inputForTable" onChange={(evt) => {

                                                                                        if (evt.target.value.length > 0 & evt.target.value > -1) {
                                                                                            item.gardes[index] = evt.target.value
                                                                                            item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                                                                            setRefresh(Math.random())
                                                                                        }
                                                                                    }} value={item.gardes[index]} /></th> 
                                                                                })}
                                                                                <th className="thDelete"><button onClick={() => {

                                                                                    if (grades.grades.length > 1) {
                                                                                        grades.grades.splice(index, 1)
                                                                                        grades.students.forEach(item => {
                                                                                            item.gardes.splice(index, 1)
                                                                                            item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                                                                        })
                                                                                        setRefresh(Math.random)
                                                                                    }

                                                                                }} className="plusButton exBut"><img src={ex} alt="close button" /></button></th>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    :
                                                                    grades.grades.map((item, index) => {


                                                                        return (
                                                                            <tr key={item + index}>
                                                                                <th className="butLine"><h3 className="h3InTable">{item}</h3></th>

                                                                                {grades.students.map(item => {

                                                                                    return (item.studentName.toLowerCase()).includes(searchName.toLowerCase()) && (item.studentName === user.userName ? <th className="butLine" key={item.studentName + index}><h3 className="h3InTable">{item.gardes[index]}</h3></th> : <th className="butLine" key={item.studentName + index}><h3 className="h3InTable lesOpp">{item.gardes[index]}</h3></th> );
                                                                                })}
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                                <tr>
                                                                    <th><h2 className="h2InGradesTable prinInTale">Total</h2></th>
                                                                    {grades.students.map(item => {
                                                                        return (item.studentName.toLowerCase()).includes(searchName.toLowerCase())  && (item.studentName === user.userName ? <th key={item.studentName}><h2 className="h2InGradesTable">{item.total}</h2></th> : <th key={item.studentName}>{club.clubOwner !== user.userName ? <h2 className="h2InGradesTable lesOpp">{item.total}</h2> : <h2 className="h2InGradesTable">{item.total}</h2>}</th> )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="butonsTableCont">
                                                        {club.clubOwner === user.userName &&
                                                            <>
                                                                <button className="getIn logInButton" onClick={addGrade} >Add grade</button>
                                                                <button onClick={() => saveChanges(club.id, grades)} className="getIn logInButton mNone">Save Changes</button>
                                                            </>


                                                        }
                                                    </div>
                                                </>
                                                :

                                                <h2 className="clubWithOutMembers">The club must have members to display the grades</h2>
                                            }


                                        </div>

                                    </div>
                                )
                            }}
                        </ContextClub.Consumer>
                    </>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ClubGrades