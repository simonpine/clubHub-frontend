import more from '../img/more.png'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import drag from '../img/drag.png'
function UserInLeaderboard({ cor, item, getUserInfo, index }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: item })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            style={style}
            {...attributes}
            // {...listeners}
            ref={setNodeRef}
            className="userOfTheList"
        >
            <div style={{ display: "flex", flexDirection: 'row' }}>

                <h3 className={`numberInList ${cor}`}>{index + 1}</h3>

                <h3 className="nomeOfUserInList">{item}</h3>
            </div>
            <div>
                <button onClick={() => getUserInfo(item)} className="buttonDis">
                    <img className="moreImg" src={more} alt="more info" />
                </button>
                <button {...listeners} onClick={() => getUserInfo(item)} className="buttonDis2">
                    <img className="moreImg" src={drag} alt="more info" />
                </button>
            </div>
        </div>
    )
}
export default UserInLeaderboard