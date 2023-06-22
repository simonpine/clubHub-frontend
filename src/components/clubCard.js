import { Link } from "react-router-dom";
import { BannersImg } from "../api";
function ClubCard({ clubCard }) {
    return (
        <div className="clubCard" key={clubCard.clubId}>
            <button className="imgCardConatiner">
                <img src={BannersImg + clubCard.clubBanner} alt="Club banner" />
            </button>
            <div className="textInCard">
                <div>
                    <h2>{clubCard.clubTitle}</h2>
                    {clubCard.own ? <span className="green">Owner</span> : <span className="blue">Member</span>}

                </div>
                <p className="pInCard">{clubCard.clubDescription}</p>
            </div>
            {clubCard.own ? <button className="DelExi">Delete</button> : <button className="DelExi">Exit</button>}
        </div>
    )
}
export default ClubCard;