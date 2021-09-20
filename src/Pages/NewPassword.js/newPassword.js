import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const NewPassword = () => {
    return (
        <div className="newPassword">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Reset your password.</p>
                    < p className="charcoalText font14"> Enter a new password for your Pali account.</p>
                </div>

                <FormInput
                    label="New Password"
                    type="password"
                />

                <FormInput
                    label="Re-Enter Password"
                    type="password"
                />

                <Button label="Set New Password" />
            </div>
        </div>
    )
}

export default NewPassword