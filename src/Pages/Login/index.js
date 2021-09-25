import { Route } from "react-router"
import LoginOTP from "./enterOTP"
import LoginHome from "./login"

const Login = () => {
    return (
        <div>
            
            <Route path="/login/login-OTP" component={LoginOTP} />
            <Route path="/login" component={LoginHome} exact />
        </div>
    )
}

export default Login