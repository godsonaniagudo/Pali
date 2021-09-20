import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"
import { useHistory, useLocation } from "react-router"
import NumberInput from "../../Components/FormInput/numberInput"
import { useState } from "react"
import { validatePhoneNumber } from "../../helpers/validators"
import Notification from "../../Components/Notification/notification"
import postPlain from "../../helpers/requests/postPlain"

const SetPhoneNumber = () => {
    const location = useLocation()
    const history = useHistory()

    const [notification, setNotification] = useState({
        text: "",
        type: ""
    })


    const validate = (event) => {
        event.preventDefault()
        if (!validatePhoneNumber(event.target[0].value)){
            const temp ={...notification}
            temp["text"] = "Please enter a valid phone number"
            temp["type"] = "Error"
            setNotification(temp)
        } else {
            const temp ={...notification}
            temp["text"] = ""
            temp["type"] = ""
            setNotification(temp)
            updateDetails(event.target[0].value)
        }
    }

    const updateDetails = (number) => {
        const details = {...location?.state?.userDetails}
        details["phone"] = number
        signUp(details);
    }

    const signUp = async (details) => {
        console.log(details);
        const signUpRequest = await postPlain("/signup", details)
        console.log({request: signUpRequest.status});

        if (signUpRequest.status === false){
            console.log({signUpRequest});
        }
        
        
        if (signUpRequest.status && signUpRequest.status === true){
            const newDetails = details
            newDetails["user_id"] = signUpRequest.data.user_id
            toVerifyPhoneNumber(newDetails)
        } else if (signUpRequest?.status === false) {
            const temp = {...notification}
            temp.text = signUpRequest.message
            temp.type = "Error"
            setNotification(temp)
        }
    }

    const toVerifyPhoneNumber = (details) => {
        history.push("/signup/verify-phone-number", details)
    }

    const closeNotification = () => {
        const temp = {...notification}
        temp.text = ""
        temp.type = ""
        setNotification(temp)
    }

    return (
        <div className="setPhoneNumber">
            {
                notification.text !== "" && <Notification text={notification.text} type={notification.type} close={() => closeNotification()} />
            }
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font20 headerText weight500">Your phone number</p>
                    <p className="charcoalText font14">We'll text you a 6-digit code to verify your number.</p>
                </div>

                <form onSubmit={(event) => validate(event)}>
                    <NumberInput
                    max={13}
                    label="Phone Number"
                    type="text"
                />

                <Button label="Continue" />
                </form>
            </div>
        </div>
    )
}

export default SetPhoneNumber