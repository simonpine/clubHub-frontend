import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
import { useState } from "react"
import { saveGrades } from "../api"
function ClubGrades() {
    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')

    async function saveChanges(id, grades) {
        await saveGrades({
            clubId: id,
            grades: grades,
        })
    }

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user && (
                    <ContextClub.Consumer>
                        {({ club, grades, setRefresh }) => {

                            function addGrade() {

                                grades.grades.push('New Grade ' + grades.grades.length)
                                grades.students.map(item => {
                                    item.gardes.push(1)
                                    item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                })
                                setRefresh(Math.random)

                            }

                            return club && (
                                <div>
                                    <NavClub user={user} club={club} main={2} />
                                    <div className="gardesTableContainer">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    {
                                                        grades.students.map(item => {
                                                            return <th key={item.studentName}>{item.studentName}</th>
                                                        })

                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {club.clubOwner === user.userName ?
                                                    grades.grades.map((item, index) => {
                                                        return item !== 'total' && (
                                                            <tr key={item + index}>
                                                                <th><input type="text" onChange={(evt) => {
                                                                    grades.grades[index] = evt.target.value
                                                                }} className="inputText" placeholder={item} /></th>
                                                                {grades.students.map(item => {
                                                                    return <th key={item.studentName + index}><input type="number" className="inputText" onChange={(evt) => {

                                                                        if (evt.target.value.length > 0 & evt.target.value > -1) {
                                                                            item.gardes[index] = evt.target.value
                                                                            item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                                                            setRefresh(Math.random())
                                                                        }
                                                                    }} value={item.gardes[index]} /></th>
                                                                })}
                                                                <th><button onClick={() => {

                                                                    if (grades.grades.length > 1) {
                                                                        grades.grades.splice(index, 1)
                                                                        grades.students.map(item => {
                                                                            item.gardes.splice(index, 1)
                                                                            item.total = (item.gardes.reduce((partialSum, a) => partialSum + (+a), 0) / item.gardes.length).toFixed(2)
                                                                        })
                                                                        setRefresh(Math.random)
                                                                    }

                                                                }} className="getIn">x</button></th>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    grades.grades.map((item, index) => {


                                                        return item !== 'total' && (
                                                            <tr key={item + index}>
                                                                <th>{item}</th>
                                                                {grades.students.map(item => {
                                                                    return <th key={item.studentName + index}>{item.gardes[index]}</th>
                                                                })}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr>
                                                    <th>Total</th>
                                                    {grades.students.map(item => {
                                                        return <th key={item.studentName}>{item.total}</th>
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="butonsTableCont">
                                            {club.clubOwner === user.userName &&
                                                <>
                                                    <button className="getIn logInButton" onClick={addGrade} >Add grade</button>
                                                    <button onClick={() => saveChanges(club.id, grades)} className="getIn logInButton">Save Changes</button>
                                                </>
                                            }
                                        </div>

                                    </div>
                                </div>
                            )
                        }}
                    </ContextClub.Consumer>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default ClubGrades