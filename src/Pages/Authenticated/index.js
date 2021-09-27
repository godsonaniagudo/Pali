import { authenticatedMenu } from "../../helpers/presets"
import logo from "../../Assets/img/paliOrange.svg"
import dropIcon from "../../Assets/img/dropIcon.svg"
import settingsIcon from "../../Assets/img/icons/settingsIcon.svg"
import "./styles/styles.css"
import People from "./People/people"
import { Route, useHistory } from "react-router"
import Home from "./Home/home"
import Profile from "./Profile"
import { capitalize, plainText } from "../../helpers/formatStrings"

const Authenticated = () => {
    const history = useHistory()
    const theUser = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="authenticated">
            <section className="leftSection">
                <div>
                    <a href="/"><img alt="logo" className="logo" src={logo} /></a>
                
                <nav>
                    {
                    authenticatedMenu.map((item, key) => <div className="menuItem" key={item.name} onClick={() => history.push(item.path)}><img alt="option icon" src={item.icon} /><p className={`${item.name} font13 menuItem`}>{item.name}</p></div>)
                }
                <hr />
                <div key={"settings"} onClick={() => history.push("/settings")}><img alt="option icon" src={settingsIcon} /><p className={`Settings font13 menuItem`}>Settings</p></div>
                </nav>
                </div>

                <div className="user">
                    <div className="left">
                        <div>
                            <span>GA</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="nameAndRole">
                            <p className="font12 weight500 primaryDarkText name">{`${theUser.user.firstname} ${theUser.user.lastname}`}</p>
                            <p className="font8 secondaryColorText stateBackground role">{plainText(capitalize(theUser.user.role))}</p>
                        </div>

                        <div className="company">
                            <p className = "font12 secondaryColorText" > {
                                theUser.company.registered_name.length > 15 ? theUser.company.registered_name.slice(0, 15) : theUser.company.registered_name
                            } </p>
                            <img alt="drop icon" src={dropIcon} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="rightSection">
                
                <Route path="/people" component={People}/>
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} exact />
                
            </section>
        </div>
    )
}

export default Authenticated