import logo from "../../Assets/img/logoPlain.svg"
import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import "./styles/style.css"

const LoginOTP = () => {
    return (
        <div className="loginOTP">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <div className="topText">
                        <div>
                            <p className="oxfordText font24 headerText weight500">Enter your One time code.</p>
                        </div>
                    </div>
                    <p className="font14 charcoalText">We’ve sent a 6-digit verification code to your email. Please enter the code.</p>
                    
                </div>

                <FormInput
                    hideLabel
                    label="Phone Number"
                    type="number"
                    placeholder={123456}
                />

                <div className="mt20 font14 charcoalText weight500">Code expires in 00:00 <span className="linkText">Resend</span></div>

                <Button label="Submit" />
            </div>

            <div className="content expired">
                <p className="oxfordText font24 headerText weight500">Code expired</p>
                <p className="font14 charcoalText">The code we've sent to your email expired, get a new one to log in. </p>
                <Button label="Resend" />
            </div>
        </div>
    )
}

export default LoginOTP