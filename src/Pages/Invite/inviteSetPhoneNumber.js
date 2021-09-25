import Button from "../../Components/Button/button";
import NumberInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import "./styles/styles.css";
import { useHistory, useLocation } from "react-router";
import { useState } from "react";
import Notification from "../../Components/Notification/notification";
import { capitalize } from "../../helpers/formatStrings";
import { validatePhoneNumber } from "../../helpers/validators";
import postProtected from "../../helpers/requests/postProtected";

const InviteSetPhoneNumber = () => {
  const location = useLocation();
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState("");
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
    event.preventDefault();

    if (!validatePhoneNumber(event.target[0].value)) {
      showNotification("Please provide a valid phone number", "Error");
    } else {
      closeNotification();
      setPhoneNumber(event.target[0].value);
    }
  };

  const setPhoneNumber = async (number) => {
    try {
      const temp = location.state;
      temp["phone"] = number;

      const setNumberRequest = await postProtected("/invite/user/accept", temp);

      if (setNumberRequest.status){
        toVerifyNumber(temp)
      } else {
          showNotification(setNumberRequest.message, "Error")
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }

  };

  const toVerifyNumber = (details) => {
    history.push("/invite/verify-phone-number", details)
  }

  return (
    <div className="setPhoneNumber">
      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
      <a href="/">
        <img alt="logo" src={logo} />
      </a>
      <div className="content">
        <div>
          <p className="oxfordText font24 headerText weight500">
            Your phone number
          </p>
          <p className="charcoalText font14">
            We'll text you a 6-digit code to verify your number.
          </p>
        </div>

        <form onSubmit={(event) => validateData(event)}>
          <NumberInput label="Phone Number" type="number" />

          <Button label="Continue" />
        </form>
      </div>
    </div>
  );
};

export default InviteSetPhoneNumber;
