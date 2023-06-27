import { ContextClub } from "../context/clubContext"
import { ContextUser } from "../context/userContext"
import NavClub from "../components/navClub"
function ClubEvent() {
    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return user && (
                    <ContextClub.Consumer>
                        {({ club }) => {
                            return club && (
                                <div>
                                    <NavClub user={user} club={club} main={1}/>
                                    <div>
                                        
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
export default ClubEvent