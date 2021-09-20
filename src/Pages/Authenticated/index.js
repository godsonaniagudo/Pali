import { authenticatedMenu } from "../../helpers/presets"
import logo from "../../Assets/img/paliOrange.svg"
import dropIcon from "../../Assets/img/dropIcon.svg"
import searchIcon from "../../Assets/img/searchIcon.svg"
import "./styles/styles.css"
import People from "./People/people"
import { Route } from "react-router"
import Home from "./Home/home"
import Profile from "./Profile"

const Authenticated = () => {
    return (
        <div className="authenticated">
            <section className="leftSection">
                <div>
                    <img alt="logo" className="logo" src={logo} />
                
                <nav>
                    {
                    authenticatedMenu.map((item, key) => <div key={item.name}><img alt="option icon" src={item.icon} /><p className={`${item.name} font13 menuItem`}>{item.name}</p></div>)
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
                            <p className="font12 weight700 primaryDarkText name">Tayo Brahm</p>
                            <p className="font12 secondaryColorText stateBackground role">Account Owner</p>
                        </div>

                        <div className="company">
                            <p className="font12 secondaryColorText">ACME Ltd</p>
                            <img alt="drop icon" src={dropIcon} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="rightSection">
                <Route path="/authenticated/people" component={People} />
                <Route path="/authenticated/profile" component={Profile} />
                <Route path="/authenticated" component={Home} exact />
            </section>
        </div>
    )
}

export default Authenticated