import { authenticatedMenu } from "../../helpers/presets"
import logo from "../../Assets/img/paliOrange.svg"
import dropIcon from "../../Assets/img/dropIcon.svg"
import searchIcon from "../../Assets/img/searchIcon.svg"
import "./styles/styles.css"
import People from "./People/people"
import { Route, useHistory } from "react-router"
import Home from "./Home/home"
import Profile from "./Profile"

const Authenticated = () => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="authenticated">
            <section className="leftSection">
                <div>
                    <a href="/"><img alt="logo" className="logo" src={logo} /></a>
                
                <nav>
                    {
                    authenticatedMenu.map((item, key) => <div key={item.name} onClick={() => history.push(item.path)}><img alt="option icon" src={item.icon} /><p className={`${item.name} font13 menuItem`}>{item.name}</p></div>)
                }
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
                            <p className="font12 weight700 primaryDarkText name">{`${user.company.contact_firstname} ${user.company.contact_lastName}`}</p>
                            <p className="font12 secondaryColorText stateBackground role">{user.user.role}</p>
                        </div>

                        <div className="company">
                            < p className = "font12 secondaryColorText" > {
                                user.company.registered_name.length > 20 ? user.company.registered_name.slice(0, 20) : user.company.registered_name
                            } < /p>
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