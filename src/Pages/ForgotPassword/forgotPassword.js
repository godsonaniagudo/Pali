import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import "./styles/styles.css";
import { useState } from "react";
import Notification from "../../Components/Notification/notification";
import { capitalize } from "../../helpers/formatStrings";
import { validateEmail } from "../../helpers/validators";
import postPlain from "../../helpers/requests/postPlain";
import NumberInput from "../../Components/FormInput/numberInput";
import { useHistory } from "react-router";

const ForgotPassword = () => {
  const history = useHistory();
  const [enterCode, setEnterCode] = useState(false);
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

  const validateData = (event) => {
    event.preventDefault();

    if (event.target[0].value.length === "") {
      showNotification("Please enterr your email address", "Error");
    } else if (!validateEmail(event.target[0].value)) {
      showNotification("The email address you entered is invalid", "Error");
    } else {
      hideNotification();
      sendResetEmail(event.target[0].value);
    }
  };

  const sendResetEmail = async (email) => {
    try {
      const sendResetEmailRequest = await postPlain("/password/forgot", {
        email,
      });

      if (sendResetEmailRequest.status) {
        setEnterCode(true);
      } else {
        showNotification(sendResetEmailRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const toNewPassword = (event) => {
    history.push("/new-password", {
      code: event.target[0].value,
    });
  };

  return (
    <div className="forgotPassword">
      {notification.text !== "" && (
        <Notification
          type={capitalize(notification.type)}
          text={capitalize(notification.text)}
          close={() => hideNotification()}
        />
      )}
      <a href="/">
        <img alt="logo" src={logo} />
      </a>
      {!enterCode && (
        <div className="content">
          <div>
            <p className="oxfordText font24 headerText weight500">
              Forgot your password?
            </p>
            <p className="charcoalText font14">
              {" "}
              Please enter the email associated with your account and you'll
              receive email instructions for resetting your password.
            </p>
          </div>

          <form onSubmit={(event) => validateData(event)}>
            <FormInput label="Email Address" type="email" />

            <Button label="Reset Password" />
          </form>
        </div>
      )}

      {enterCode && (
        <div className="content">
          <div>
            <p className="oxfordText font24 headerText weight500">
              Enter the reset code
            </p>
            <p className="charcoalText font14">
              {" "}
              Please enter the four-digit code that was sent to your email
              address.
            </p>
          </div>

          <form
            className="codeEntry"
            onSubmit={(event) => toNewPassword(event)}
          >
            <NumberInput label="Code" max={4} placeholder="1234" />

            <Button label="Reset Password" />
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
