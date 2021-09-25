import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {BrowserRouter as Router, Switch, Route, BrowserRouter, Redirect} from "react-router-dom"
import Authenticated from "./Pages/Authenticated"
import DueDiligenceIndex from "./Pages/DueDiligence"
import ForgotPassword from "./Pages/ForgotPassword/forgotPassword"
import InviteIndex from "./Pages/Invite"
import Login from "./Pages/Login"
import NewPassword from "./Pages/NewPassword.js/newPassword"
import SignUp from "./Pages/SignUp"
import Verify from "./Pages/VerifyEmail/verify"
import "./styles/styles.css"

const Container = () => {

    const loggedIn = useSelector(state => state.loggedIn)

    const currentUser = localStorage.getItem("user")
    const user = JSON.parse(currentUser)

    return (

            <BrowserRouter>
                <Switch>
                    <Route path="/due-diligence" component={DueDiligenceIndex} />
                    <Route path="/invite" component={InviteIndex} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/forgot-password" component={ForgotPassword} exact />
                    <Route path="/new-password" component={NewPassword} />
                    <Route path="/verify/:id" component={Verify} />
                    <Route path="/login" component={Login} />
                    <Route path="/">
                        {
                            user?.user ? <Authenticated /> : <Redirect to="/login" />
                        }
                    </Route>
                    
                </Switch>
            </BrowserRouter>

    )
}

export default Container