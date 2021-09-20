import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const Invite = () => {
    return (
        <div className="invite">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">You've got an invitation</p>
                </div>

                <FormInput
                    label="Company email address"
                    type="email"
                />

                <div className="name">
                <FormInput
                    label="First Name"
                    type="text"
                />
                
                <FormInput
                    label="Last Name"
                    type="text"
                />                 
                </div>

                <FormInput
                    label="Create Password"
                    type="password"
                    side
                />

                <Button label="Create Account" />
            </div>
        </div>
    )
}

export default Invite