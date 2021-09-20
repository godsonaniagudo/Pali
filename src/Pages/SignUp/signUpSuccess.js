import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import companyLogo from "../../Assets/img/companyIcon.svg"
import "./styles/styles.css"
import {
    useState
} from "react"

const SignUpSuccess = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName : "Paribus Limited",
        companyAddress: "Unit 20 , William James House, Cowley Road, CB4 0WX Cambridge",
        companyRegNo: "RC 03600013"
    })

    return (
        <div className="signupSuccess">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font20 headerText weight500">Check your email</p>
                    <p className="charcoalText font14">We have sent you an email at dev@getpali.co with link that will sign you into Pali</p>
                </div>

                <Button label="I did not receive my email" />
            </div>
        </div>
    )
}

export default SignUpSuccess