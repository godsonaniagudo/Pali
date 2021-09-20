import {BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom"
import Authenticated from "./Pages/Authenticated"
import DueDiligenceIndex from "./Pages/DueDiligence"
import ForgotPassword from "./Pages/ForgotPassword/forgotPassword"
import InviteIndex from "./Pages/Invite"
import Login from "./Pages/Login"
import NewPassword from "./Pages/NewPassword.js/newPassword"
import SignUp from "./Pages/SignUp"
import "./styles/styles.css"

const Container = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/due-diligence" component={DueDiligenceIndex} />
                <Route path="/invite" component={InviteIndex} />
                <Route path="/signup" component={SignUp} />
                <Route path="/forgot-password" component={ForgotPassword} exact />
                <Route path="/new-password" component={NewPassword} />
                <Route path="/authenticated" component={Authenticated} />
                <Route path="/" component={Login} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default Container