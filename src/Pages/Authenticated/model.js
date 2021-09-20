import searchIcon from "../../../Assets/img/searchIcon.svg"
import IconButton from "../../../Components/IconButton"
import "./styles/styles.css"

const People = () => {
    return (
        <div className="people">
            <nav>
                <div className="navLeft">
                    <img alt="searchIcon" src={searchIcon} />
                    <input placeholder="Search Expense, Members, Reimbbursments etc." />
                </div>

                <div className="navRight">
                    <p className="font13 mr10 weight600">Add Employees</p>

                    <IconButton />
                </div>
            </nav>
        </div>
    )
}

export default People