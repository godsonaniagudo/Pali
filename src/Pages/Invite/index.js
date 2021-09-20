import { Route } from "react-router"
import Invite from "./invite"
import InviteSetPhoneNumber from "./inviteSetPhoneNumber"
import InviteVerifyPhoneNumber from "./inviteVerifyPhoneNumber"

const InviteIndex = () => {
    return (
        <div>
            <Route path="/invite" component={Invite} exact />
            <Route path="/invite/set-phone-number" component={InviteSetPhoneNumber} />
            <Route path="/invite/verify-phone-number" component={InviteVerifyPhoneNumber} />
        </div>
    )
}

export default InviteIndex