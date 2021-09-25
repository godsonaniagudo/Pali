import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import companyLogo from "../../Assets/img/companyIcon.svg"
import "./styles/styles.css"
import {
    useEffect,
    useState
} from "react"
import { useHistory, useLocation } from "react-router"

const SignUpSuccess = () => {
    const location = useLocation()
    const history = useHistory()

    if (!location?.state?.email) {
        history.push("/signup")
    }

    return (
        <div className="signupSuccess">
            <a href="/"><img alt="logo" src={logo} /></a>
            <div className="content">
                <div>
                    <p className="oxfordText font20 headerText weight500">Check your email</p>
                    {
                        location?.state?.email && <p className="charcoalText font14">We have sent you an email at {location.state.email} with a link that will sign you into Pali</p>
                    }
                </div>

                <Button label="I did not receive my email" />
            </div>
        </div>
    )
}

export default SignUpSuccess