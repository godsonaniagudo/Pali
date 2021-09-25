import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const ForgotPassword = () => {
    return (
        <div className="forgotPassword">
            <a href="/"><img alt="logo" src={logo} /></a>
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Forgot your password?</p>
                    < p className = "charcoalText font14"> Please enter the email associated with your account and you'll receive email instructions for resetting your password.</p>
                </div>

                <FormInput
                    label="Email Address"
                    type="email"
                />

                <Button label="Reset Password" />
            </div>
        </div>
    )
}

export default ForgotPassword