import { Redirect, Route } from "react-router"
import Invite from "./invite"
import InviteSetPhoneNumber from "./inviteSetPhoneNumber"
import InviteVerifyPhoneNumber from "./inviteVerifyPhoneNumber"

const InviteIndex = () => {
    return (
        <div>
            <Route path="/invite/set-phone-number" component={InviteSetPhoneNumber} exact />
            <Route path="/invite/form/:code" component={Invite}/>
            <Route path="/invite" exact>
                <Redirect to="/" />
            </Route>
            <Route path="/invite/verify-phone-number" component={InviteVerifyPhoneNumber} exact />
        </div>
    )
}

export default InviteIndex