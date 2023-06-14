import { ContextUser } from "../context/userContext"
function Home({con}){
    return(
        <ContextUser.Consumer>
        {({asd, seter}) => {
            return (
                <div className='confirmation'>
                    <div>{asd}</div>
                </div>
            )
        }}
    </ContextUser.Consumer> 
    )
}
export default Home