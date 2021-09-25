import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import companyLogo from "../../Assets/img/companyIcon.svg";
import "./styles/styles.css";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import postPlain from "../../helpers/requests/postPlain";
import Notification from "../../Components/Notification/notification";
import { getInitials } from "../../helpers/formatStrings";
import patchPlain from "../../helpers/requests/patchPlain";

const SelectCompany = () => {
  const location = useLocation();
  const history = useHistory()
  const [companyDetails, setCompanyDetails] = useState({});
  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });
  const termsCheck = useRef(null);

  const closeNotification = () => {
    const temp = { ...notification };
    temp.text = "";
    temp.type = "";
    setNotification(temp);
  };

  const findCompany = async (event) => {
    event.preventDefault();
    const findCompanyRequest = await postPlain("/company/find", {
      rc_number: event.target[0].value,
      user_id: location.state.details.user_id,
    });

    if (findCompanyRequest.status === true) {
      const tempDetails = { ...companyDetails };
      tempDetails["companyName"] = findCompanyRequest.data.company_name;
      tempDetails["companyAddress"] = findCompanyRequest.data.company_address;
      tempDetails["companyRegNo"] =
        findCompanyRequest.data.company_registration_number;
      setCompanyDetails(tempDetails);
    } else {
      const temp = { ...notification };
      temp.text = findCompanyRequest.data.message;
      temp.type = "Error";
      setNotification(temp);
    }
  };

  const handleSubmit = () => {
    if (!termsCheck.current.checked) {
      const temp = { ...notification };
      temp.text = "You have not accepted our terms of service";
      temp.type = "Error";
      setNotification(temp);
    } else if (Object.entries(companyDetails).length === 0) {
      const temp = { ...notification };
      temp.text = "You have not selected your company";
      temp.type = "Error";
      setNotification(temp);
    } else {
      submitCompany();
    }
  };

  const submitCompany = async () => {
    const submitCompanyRequest = await patchPlain("/company/confirm", {
      rc_number: companyDetails.companyRegNo,
      user_id: location.state.details.user_id,
    });

    if (submitCompanyRequest.status) {
        toSignUpSuccess()
    } else if (submitCompanyRequest.status === true) {
              const temp = { ...notification };
              temp.text = submitCompanyRequest.message;
              temp.type = "Error";
              setNotification(temp);
    }
  };

  const toSignUpSuccess = () => {
      history.push("/signup/signup-success", {
        email: location.state.details.email,
        user_id: location.state.details.user_id
      });
  }

  return (
    <div className="selectCompany">
      {notification.text !== "" && (
        <Notification
          text={notification.text}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}

      <a href="/"><img alt="logo" src={logo} /></a>
      
      <div className="content">
        <div>
          <p className="oxfordText font20 headerText weight500">
            Find your company
          </p>
          <p className="charcoalText font14">
            You can search by company name or registration number
          </p>
        </div>

        <form onSubmit={(event) => findCompany(event)}>
          <FormInput label="Company" type="text" />
        </form>

        {Object.entries(companyDetails).length !== 0 && (
          <div className="companyDetails oxfordText">
            {/* <img alt="companyLogo" src={companyLogo} /> */}
            <div className="companyInitials">
              {getInitials(companyDetails.companyName.toLocaleUpperCase())}
            </div>
            <div>
              <p className="weight500 font14">
                {companyDetails.companyName.toLocaleUpperCase()}
              </p>
              <p className="font14">{companyDetails.companyAddress}</p>
              <p className="font14">{companyDetails.companyRegNo}</p>
            </div>
          </div>
        )}

        <div className="terms mt10">
          <input type="checkbox" ref={termsCheck} />
          <p className="oxfordText font14">
            I have read and accept the Terms of Service, Terms of Service and
            Privacy Policy
          </p>
        </div>

        <div className="buttonContainer">
          <Button label="Create Account" onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default SelectCompany;
