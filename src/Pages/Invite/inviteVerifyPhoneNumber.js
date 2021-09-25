import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import NumberInput from "../../Components/FormInput/numberInput";
import postPlain from "../../helpers/requests/postPlain";
import React, { useEffect, useState } from "react";
import Notification from "../../Components/Notification/notification";
import { useHistory, useLocation } from "react-router";
import { capitalize } from "../../helpers/formatStrings";
import { useDispatch } from "react-redux";

const InviteVerifyPhoneNumber = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [expired, setExpired] = useState(false);

  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });

  useEffect(() => {
      if (!location?.state?.phone){
          history.push("/")
      }
    startCountdown();
  }, []);



  const startCountdown = () => {
    var localSeconds = 59;
    var localMinutes = 4;

    const countdown = setInterval(() => {
      if (localMinutes >= 0) {
        if (localMinutes < 0) {
          
          
        } else {
          if (localSeconds <= 0) {
            if (localSeconds === 0 && localMinutes === 0) {
              setSeconds(0);
              setMinutes(0);
              setExpired(true);
              clearInterval(countdown);
            } else {
              localSeconds = 59;
              localMinutes = localMinutes - 1;
              setSeconds(localSeconds);
              setMinutes(localMinutes);
            }
          } else {
            localSeconds = localSeconds - 1;
            setSeconds(localSeconds);
            setMinutes(localMinutes);
          }
        }
      }
    }, 1000);
  };

  const closeNotification = () => {
    const temp = { ...notification };
    temp.text = "";
    temp.type = "";
    setNotification(temp);
  };

  const verifyOTP = async (event) => {
    event.preventDefault();
    const verifyNumber = await postPlain("/verify/phone/otp", {
      code: event.target[0].value,
    });

    if (verifyNumber.status) {
        console.log(verifyNumber);
    } else if (verifyNumber.status === false) {
      const temp = { ...notification };
      temp.text = verifyNumber.message;
      temp.type = "Error";
      setNotification(temp);
    }
  };

  const resendOTP = async () => {
    const resendRequest = await postPlain("/otp/phone/resend", {
      phone: location.state.phone,
    });

    if (resendRequest.status) {
      const temp = { ...notification };
      temp.text = resendRequest.message;
      temp.type = "Success";
      setNotification(temp);
      setExpired(false);
      startCountdown();
    } else if (resendRequest.status === false) {
      const temp = { ...notification };
      temp.text = resendRequest.message;
      temp.type = "Error";
      setNotification(temp);
    }
  };


  return (
    <div className="verifyPhoneNumber">
      {notification.text !== "" && (
        <Notification
          text = {
              capitalize(notification.text)
          }
          type={notification.type}
          close={() => closeNotification()}
        />
      )}

      <a href="/"><img alt="logo" src={logo} /></a>

      {
          !expired && <React.Fragment>
        <div className="content">
          <div>
            <div className="topText">
              <div>

                <p className="oxfordText font20 headerText weight500">
                  Verify your phone number.
                </p>
              </div>
            </div>
            <p className="font14 charcoalText">
              {
                  `We’ve sent a 6-digit verification code to your number ending in ${location.state.phone.slice(location.state.phone.length - 2)}. Please enter the code`
              } < span className = "linkText"
              onClick = {
                      () => {
                  history.goBack()
              }}>New number?</span>
            </p>
          </div>

          <form
            onSubmit={(event) => {
              verifyOTP(event);
            }}
          >
            <NumberInput
              hideLabel={true}
              max={6}
              type="text"
              placeholder={123456}
            />

            <div className="mt20 font14 charcoalText weight500">
              {!expired && (
                <span>{`Code expires in ${
                  minutes < 10 ? "0" + minutes : minutes
                }:${seconds < 10 ? "0" + seconds : seconds}`}</span>
              )}

              {expired && (
                <span>
                  The code you were sent has expired:{" "}
                  <span className="linkText ml10" onClick={() => resendOTP()}>Resend</span>
                </span>
              )}
            </div>

            <Button label="Submit" />
          </form>
        </div>
      </React.Fragment>
      }

      {expired && (
        <div className="content expired">
          <p className="oxfordText font24 headerText weight500">Code expired</p>
          <p className="font14 charcoalText">
            The code we've sent to your email expired, get a new one to log in.{" "}
          </p>
          <Button
            label="Resend"
            onClick={() => {
              resendOTP()
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InviteVerifyPhoneNumber;
