import { Route } from "react-router"
import LoginOTP from "./enterOTP"
import LoginHome from "./login"

const Login = () => {
    return (
        <div>
            
            <Route path="/login-OTP" component={LoginOTP} />
            <Route path="/" component={LoginHome} exact />
        </div>
    )
}

export default Login