import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import "./styles/styles.css";
import logo from "../../Assets/img/paliLogo.svg";
import { useState } from "react";
import Notification from "../../Components/Notification/notification";
import { validateEmail, validatePassword } from "../../helpers/validators";
import { useHistory } from "react-router";

const SignUpHome = () => {

  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });

  const history = useHistory()

  const setNotificationDetails = (text, type) => {
    const temp = { ...notification };
    temp.text = text;
    temp.type = type;
    setNotification(temp);
  };

  const clearNotification = () => {
    const temp = { ...notification };
    temp.text = "";
    temp.type = "";
    setNotification(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateDetails(event.target);
  };
  
  const toSetPhoneNumber = (userDetails) => {
    history.push("/signup/set-phone-number", {userDetails})
  }

  const validateDetails = (form) => {
    if (form[0].value === "") {
      setNotificationDetails("First name is required", "Error");
    } else if (form[1].value === "") {
      setNotificationDetails("Last name is required", "Error");
    } else if (form[2].value === "") {
      setNotificationDetails("Email address is required", "Error");
    } else if (!validateEmail(form[2].value)){
        setNotificationDetails("Please enter a valid email address", "Error");
    } else if (form[3].value === "") {
      setNotificationDetails("Password is required", "Error");
    } else if (!validatePassword(form[3].value)){
        setNotificationDetails("Password muust be at least 8 characters long and contain at least a digit, an upper case letter and a special character.")
    } else {
      clearNotification();
      const userDetails = {}
      userDetails["firstName"] = form[0].value;
      userDetails["lastName"] = form[1].value;
      userDetails["email"] = form[2].value;
      userDetails["password"] = form[3].value;
      toSetPhoneNumber(userDetails)
    }
  };

  return (
    <div className="signUpBody fullScreenSize">
      {notification.text && (
        <Notification
          text={notification.text}
          type={notification.type}
          close={() => clearNotification()}
        />
      )}
      <section className="leftSection fullHeight backgroundBrand">
        <img alt="logo" src={logo} />
      </section>

      <section className="rightSection fullHeight">
        <div className="content">
          <p className="greyText1 font14">Welcome!</p>
          <p className="oxfordText font20 headerText weight500">
            Welcome to the future of corporate spend
          </p>
          <p className="charcoalText font14">
            Let's start by opening your account.
          </p>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="names">
              <FormInput label="First Name" />

              <FormInput label="Last Name" />
            </div>

            <FormInput label="Company email address" type="email" />

            <FormInput label="Create Password" side type="password" />

            <Button label="Continue" />
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpHome;
