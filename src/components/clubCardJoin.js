import { BannersImg } from "../api"
function ClubCardJoin({ item, jo }) {
    return (
        <div className="cardOfJoinList">
            <div className="imgCardListCont">
                <img src={BannersImg + item.clubBanner} alt="Banner of the club" />
            </div>
            <div className="textInClubCardJoin">
                <div>
                    <h2 className="blubCardTitle">{item.title}</h2>
                    <h5 className="green">{item.clubOwner}</h5>
                </div>
                <p className="pInCard">{item.description}</p>
                <button onClick={()=> jo(item)} className="getIn logInButton">Join</button>
            </div>
        </div>
    )
}
export default ClubCardJoin