import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"
import { useHistory, useRouteMatch } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import Notification from "../../Components/Notification/notification"
import { capitalize } from "../../helpers/formatStrings"
import { validateEmail, validatePassword } from "../../helpers/validators"

const Invite = () => {
    const route = useRouteMatch()
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState("")
      const [notification, setNotification] = useState({
          text: "",
          type: "",
      });

      const showNotification = (text, type) => {
          const temp = {
              ...notification,
          };
          temp["text"] = text;
          temp["type"] = type;
          setNotification(temp);
      };

      const closeNotification = () => {
          const temp = {
              ...notification,
          };
          temp["text"] = "";
          temp["type"] = "";
          setNotification(temp);
      };

    const validateData = (event) => {
        event.preventDefault()

        if (event.target[0].value === "") {
            showNotification("Email address is required", "Error")
        } else if (!validateEmail(event.target[0].value)) {
            showNotification("Please enter a valid email address", "Error")
        } else if (event.target[1].value === "") {
            showNotification("First name is required", "Error")
        } else if (event.target[2].value === "") {
            showNotification("Last name is required", "Error")
        } else if (event.target[3].value === "") {
            showNotification("Password is required", "Error")
        } else if (!validatePassword(event.target[3].value)) {
            showNotification("Password must be at least 8 characters long and have at least one upper case letter, one number and one special character", "Error")
        } else {
            closeNotification()

            const details = {
                    otp: route.params.code,
                    firstname: event.target[1].value,
                    lastname: event.target[2].value,
                    password: event.target[3].value,
            }

            toSetPhoneNumber(details)
        }
    }

    const toSetPhoneNumber = (details) => {
        history.push("/invite/set-phone-number", details)
    }

    return (
        <div className="invite">
                  {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
            <a href="/"><img alt="logo" src={logo} /></a>
            <div className="content">
                {
                    errorMessage === "" && <form onSubmit={event => validateData(event)}>
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
                    side="show"
                />

                <Button label="Create Account" />
                    </form>
                }

                {
                    errorMessage !== "" && <p className="font20 oxfordText weight600">{errorMessage}</p>
                }
            </div>
        </div>
    )
}

export default Invite