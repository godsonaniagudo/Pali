import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"
import { validatePassword } from "../../helpers/validators"
import { useHistory, useLocation } from "react-router"
import { capitalize } from "../../helpers/formatStrings"
import Notification from "../../Components/Notification/notification"
import { useState } from "react"
import postPlain from "../../helpers/requests/postPlain"

const NewPassword = () => {
    const location = useLocation()
    const history = useHistory()


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

      const hideNotification = () => {
          const temp = {
              ...notification,
          };
          temp["text"] = "";
          temp["type"] = "";
          setNotification(temp);
      };

    const validateEmails = (event) => {
        event.preventDefault()

        if (event.target[0].value === ""){
            showNotification("Please enter a new password", "Error")
        } else if (!validatePassword(event.target[0].value)) {
            showNotification("Password has to be at least 8 characters long and contain at least one uppercase letter, one number and one special character", "Error")
        } else if (event.target[1].value !== event.target[0].value) {
            showNotification("Passwords do not match", "Error")
        } else {
            hideNotification()
            const passwordDetails = {
                "code": location.state.code,
                "password": event.target[0].value
            }

            resetPassword(passwordDetails)
        }
    }

    const resetPassword = async (details) => {
        try {
            const resetPasswordRequest = await postPlain("/password/reset", details)

            if (resetPasswordRequest) {
                toLogin()
            } else {
                showNotification(capitalize(resetPasswordRequest.message), "Error")
            }
        } catch (error) {
            showNotification(capitalize(error.message), "Error")
        }
    }

    const toLogin = () => {
        history.push("/")
    }

    return (
        <div className="newPassword">
                  {notification.text !== "" && (
        <Notification
          type={capitalize(notification.type)}
          text={capitalize(notification.text)}
          close={() => hideNotification()}
        />
      )}
            <a href="/"><img alt="logo" src={logo} /></a>
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Reset your password.</p>
                    < p className="charcoalText font14"> Enter a new password for your Pali account.</p>
                </div>

                <form onSubmit={event => validateEmails(event)}>
                    <FormInput
                    label="New Password"
                    type="password"
                />

                    <FormInput
                        label="Re-Enter Password"
                        type="password"
                    />

                    <Button label="Set New Password" />
                </form>
            </div>
        </div>
    )
}

export default NewPassword