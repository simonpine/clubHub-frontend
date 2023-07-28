import { BannersImg } from "../api"
function ClubCardJoin({ item, jo }) {
    return (
        <>

            <div className="cardOfJoinList">
                <div className="imgCardListCont">
                    <img src={BannersImg + item.clubBanner} alt="Banner of the club" />
                </div>
                <div className="textInClubCardJoin">
                    <div>
                        <h2 className="blubCardTitle">{item.title}</h2>
                    </div>
                    <p className="pInCardJoin">{item.description.slice(0, 170)} ...</p>
                    <button onClick={() => jo(item)} className="getIn logInButton">More info</button>
                </div>
            </div>
        </>
    )
}
export default ClubCardJoin