import { Link } from "react-router-dom"
function AddClubNav() {
    return (
        <div className="miniNavHome">
            <Link to={{ pathname: "/createClub" }} className="AddClubLink Fr">Create club</Link>
            <Link to={{ pathname: "/joinClub" }} className="AddClubLink Md">Join club</Link>
            <Link to={{ pathname: "/addFriends" }} className="AddClubLink Sc">Add friend</Link>
        </div>
    )
}
export default AddClubNav