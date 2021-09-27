import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../Assets/img/paliOrange.svg";
import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import Notification from "../../Components/Notification/notification";
import { capitalize } from "../../helpers/formatStrings";
import postPlain from "../../helpers/requests/postPlain";
import { validateEmail } from "../../helpers/validators";
import "./styles/style.css";

const LoginHome = () => {
    const history = useHistory()
  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });

  const showNotification = (text, type) => {
      const temp = {...notification}
      temp["text"] = text
      temp["type"] = type
      setNotification(temp)
  }

  const hideNotification = () => {
    const temp = { ...notification };
    temp["text"] = "";
    temp["type"] = "";
    setNotification(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (event.target[0].value === "") {
        showNotification("Email is required", "Error")
    } else if (!validateEmail(event.target[0].value)){
        showNotification("Enter a valid email address", "Error")
    } else if (event.target[1].value === ""){
        showNotification("Password is required", "Error")
    } else {
        hideNotification()
        logUserIn({
          email: event.target[0].value,
          password: event.target[1].value,
        });
    }
  }

  const logUserIn = async (loginData) => {
    try {
        const loginRequest = await postPlain("/login", loginData)
        
        if (loginRequest.status){
            toLogin()
        } else {
            showNotification(capitalize(loginRequest.message), "Error");
        }
    } catch (error) {
        showNotification(capitalize(error.message), "Error");
    }
  }

  const toLogin = () => {
      history.push("/login/login-OTP");
  }

  return (
    <div className="login fullScreenSize">
      {notification.text !== "" && (
        <Notification type={notification.type} text={notification.text} close={() => hideNotification()} />
      )}
      <nav>
        <a href="/"><img alt="logo" src={logo} /></a>
        <p className="font14">
          Don't have an account? &nbsp;
          <a className="linkText" href="/signup">
            Get started for free
          </a>
        </p>
      </nav>

      <div className="content">
        <p className="oxfordText font24 headerText weight500 centerText mb20">
          Welcome Back!
        </p>

        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <FormInput label="Email address" />

          <FormInput label="Password" type="password" />

          <div className="mt5">
            <Button label="SIGN IN" />
          </div>

          <div className="mt15 ">
            <a className="underlined" href="/forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginHome;
