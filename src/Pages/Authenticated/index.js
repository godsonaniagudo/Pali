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
import { useState } from "react"
import Settings from "./Settings/settings"
import Accounting from "./Accounting/accounting"
import Bills from "./Bills/bills"
import Claims from "./Claims/claims"
import Requests from "./Requests/Requests"
import Vendors from "./Vendors/vendors"

const Authenticated = () => {
    const history = useHistory()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const theUser = JSON.parse(localStorage.getItem("user"))

    const toggleShowUserMenu = () => {
        if (showUserMenu) {
            setShowUserMenu(false)
        } else {
            setShowUserMenu(true)
        }
    }

    return (
        <div className="authenticated">
            <section className="leftSection">
                <div>
                    <a href="/"><img alt="logo" className="logo" src={logo} /></a>
                
                <nav>
                    {
                    authenticatedMenu.map((item, key) => <div className="menuItem" key={item.name} onClick={() => history.push(item.path)}><img alt="option icon" src={item.icon} /><p className={`${item.name} font13 menuItem oxfordText`}>{item.name}</p></div>)
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
                    <div className="right" onClick={() => toggleShowUserMenu()}>
                        <div className="nameAndRole">
                            <p className="font12 weight500 primaryDarkText name">{`${theUser.user.firstname} ${theUser.user.lastname}`}</p>
                            <p className="font8 secondaryColorText stateBackground role">{plainText(capitalize(theUser.user.role))}</p>
                        </div>

                        <div className="company">
                            {
                                showUserMenu && <div className="menu">
                                <div className="grayBG menuTop">
                                    <p className="font14 oxfordText weight500">Tayo Braham</p>
                                    <p className="font12 secondaryColorText weight400 companyName">Elephant NG Limited</p>
                                </div>
                                <div className="menuBottom">
                                    <a href="/profile" className="font13 oxfordText weight400">My Profile</a>
                                    <p className="font13 oxfordText weight400 help">Help</p>
                                </div>
                            </div>
                            }
                            <p className = "font12 secondaryColorText cursorPointer" > {
                                theUser.company.registered_name.length > 15 ? theUser.company.registered_name.slice(0, 15) : theUser.company.registered_name
                            } </p>
                            <img alt="drop icon" src={dropIcon} className="cursorPointer" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="rightSection">
                

                <Route path="/accounting" component={Accounting} />
                <Route path="/bills" component={Bills} />
                <Route path="/claims" component={Claims} />
                <Route path="/people" component={People}/>
                <Route path="/profile" component={Profile} />
                <Route path="/requests" component={Requests} />
                <Route path="/settings" component={Settings} />
                <Route path="/Vendors" component={Vendors} />
                <Route path="/" component={Home} exact />
                
                
            </section>
        </div>
    )
}

export default Authenticated