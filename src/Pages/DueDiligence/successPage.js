import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"
import { useHistory } from "react-router"

const DueDiligenceSuccess = () => {
    const history = useHistory()
    const currentUser = localStorage.getItem("user")
    const user = JSON.parse(currentUser)
    


    return (
        <div className="dueDiligence">
            <a href="/"><img alt="logo" src={logo} className="logo" /></a>
            <div className="content">
                <div>
                    <p className="oxfordText font18 headerText weight500">Thank you for submiting your company information</p>
                    <p className="charcoalText font14 mt10">We are still in the process of verifying your company and will get back to you within 1-2 business days. Our team will review them and let you know if there are any issues.</p>
                </div>
            </div>
        </div>
    )
}

export default DueDiligenceSuccess