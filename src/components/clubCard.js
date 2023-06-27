import { Link } from "react-router-dom";
import { BannersImg } from "../api";

function ClubCard({ clubCard, delet, exit }) {


    return (
        <div className="clubCard" key={clubCard.clubId}>
            <Link to={{pathname: "/club/" + clubCard.clubId}} className="imgCardConatiner">
                <img src={BannersImg + clubCard.clubBanner} alt="Club banner" />
            </Link>
            <div className="textInCard">
                <div>
                    <h2 className="blubCardTitle">{clubCard.clubTitle}</h2>
                    {clubCard.own ? <span className="green">Owner</span> : <span className="blue">Member</span>}

                </div>
                <p className="pInCard">{clubCard.clubDescription}</p>
            </div>
            {clubCard.own ? <button onClick={()=> delet(clubCard.clubId)} className="DelExi">Delete</button> : <button onClick={() => exit(clubCard.clubId)} className="DelExi">Exit</button>}
        </div>
    )
}
export default ClubCard;