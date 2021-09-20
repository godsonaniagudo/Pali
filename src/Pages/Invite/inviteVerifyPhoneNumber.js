import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const InviteVerifyPhoneNumber = () => {
return (
        <div className="verifyPhoneNumber">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <div className="topText">
                        <div>
                            <p className="oxfordText font24 headerText weight500">Verify your phone number.</p>
                        </div>
                    </div>
                    <p className="font14 charcoalText">We’ve sent a 6-digit verification code to your number ending in 20. Please enter the code. <span className="linkText font14">Use a different phone number</span></p>
                    
                </div>

                <FormInput
                    hideLabel
                    label="Phone Number"
                    type="number"
                    placeholder={123456}
                />

                <div className="mt20 font14 charcoalText weight500">Code expires in 00:00 <span className="linkText">Resend</span></div>

                <Button label="Verify phone number" />
            </div>
        </div>
    )
}

export default InviteVerifyPhoneNumber