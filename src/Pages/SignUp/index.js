import { Route } from "react-router"
import SelectCompany from "./selectCompany"
import SetPhoneNumber from "./setPhoneNumber"
import SignUpHome from "./signUp"
import SignUpSuccess from "./signUpSuccess"
import VerifyPhoneNumber from "./verifyPhoneNumber"

const SignUp = () => {
    return (
        <div>
            <Route path="/signup" component={SignUpHome} exact />
            <Route path="/signup/set-phone-number" component={SetPhoneNumber} exact />
            <Route path="/signup/verify-phone-number" component={VerifyPhoneNumber} exact />
            <Route path="/signup/select-company" component={SelectCompany} exact />
            <Route path="/signup/signup-success" component={SignUpSuccess} exact />
        </div>
    )
}

export default SignUp