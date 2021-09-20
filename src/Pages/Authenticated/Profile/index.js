import searchIcon from "../../../Assets/img/searchIcon.svg"
import IconButton from "../../../Components/IconButton"


const Profile = () => {
    return (
        <div className="profile">
            <nav>
                <div className="navLeft">
                    <img alt="searchIcon" src={searchIcon} />
                    <input placeholder="Search Expense, Members, Reimbbursments etc." />
                </div>
            </nav>

            <p className="font20 oxfordText weight600 mt15">My Profile</p>

            <div className="user mt20 flexAlignCenter">
                <div className="userAvatar">
                    <div className="placeholder"></div>
                </div>

                <div className="userDetails pl20">
                    <p className="font16 oxfordText weight500">Ade Doe</p>
                    <p className="font14 oxfordText mt5">ade.doe@elephantco.com</p>
                </div>
            </div>
        </div>
    )
}

export default Profile