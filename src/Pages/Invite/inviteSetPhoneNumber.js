import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const InviteSetPhoneNumber = () => {
    return (
        <div className="setPhoneNumber">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Your phone number</p>
                    <p className="charcoalText font14">We'll text you a 6-digit code to verify your number.</p>
                </div>

                <FormInput
                    label="Phone Number"
                    type="number"
                />

                <Button label="Continue" />
            </div>
        </div>
    )
}

export default InviteSetPhoneNumber