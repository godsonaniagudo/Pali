import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import "./styles/styles.css";
import DropDown from "../../Components/DropDown/dropDown";
import { categories, states } from "../../helpers/presets";
import React, { useEffect, useState } from "react";
import getPlain from "../../helpers/requests/getPlain";
import getProtected from "../../helpers/requests/getProtected";
import { capitalize } from "../../helpers/formatStrings";
import Notification from "../../Components/Notification/notification";
import patchProtected from "../../helpers/requests/patchProtected";
import { useHistory } from "react-router";

const SetUpCompany = () => {
  const [sameAddress, setSameAddress] = useState(false);
  const [categories, setCategories] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [countries, setCountries] = useState("");
  const [category, setCategory] = useState({});
  const [country, setCountry] = useState({});
  const [company, setCompany] = useState({})
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

  const closeNotification = () => {
    const temp = {
      ...notification,
    };
    temp["text"] = "";
    temp["type"] = "";
    setNotification(temp);
  };

  const handleSameAddressChange = (event) => {
    setSameAddress(event.target.checked);
  };

  useEffect(() => {
    getCountries();
    getCategories();
    getCompany()
  }, []);

  const getCountries = async () => {
    const getCountriesRequest = await getPlain("/country");
    var temp = [...countries];
    temp = getCountriesRequest.data.map((item) => item.name);
    setCountryNames(temp);
    setCountries(getCountriesRequest.data);
  };

  const getCategories = async () => {
    const getCategoriesRequest = await getProtected("/company/category");
    var temp = [...categories];
    temp = getCategoriesRequest.data.map((item) => item.name);
    setCategoryNames(temp);
    setCategories(getCategoriesRequest.data);
  };

  const getCompany = async () => {
    const getCompanyRequest = await getProtected("/company")
    var temp = {...company}
    temp = getCompanyRequest.data.company
    setCompany(temp)
  }

  const validateFormData = (event) => {
    event.preventDefault();

    if (String(event.target[0].value).length === 0) {
      showNotification("Please enter a TIN", "Error")
    } else if (Object.entries(category).length === 0) {
      showNotification("Please select a category", "Error")
    } else if (event.target[1].value.length === 0) {
      showNotification("Please enter a description for your company", "Error")
    } else if (event.target[6] && !event.target[6].checked && event.target[3].value.length === 0) {
      showNotification("Your company address is required", "Error");
    } else if (event.target[6] && !event.target[6].checked && event.target[4].value.length === 0) {
      showNotification("Enter the city your company is located in", "Error");
    } else if (event.target[6] && !event.target[6].checked && event.target[5].value.length === 0) {
      showNotification("Enter the state your company is located in", "Error");
    } else if (event.target[6] && !event.target[6].checked && Object.entries(country).length === 0) {
      showNotification(
        "Please select the country your company is registered in",
        "Error"
      );
    } else {
      const companyDetails = {
        tin: String(event.target[0].value),
        category_id: category.id,
        description: event.target[1].value,
        website: event.target[2].value,
        address:
          event.target[6] && !event.target[6].checked
            ? event.target[3].value
            : company.registered_address,
        city:
          event.target[6] && !event.target[6].checked
            ? event.target[4].value
            : "placeholder",
        state:
          event.target[6] && !event.target[6].checked
            ? event.target[5].value
            : "placeholder",
        country_id:
          event.target[6] && !event.target[6].checked
            ? Number(country.id)
            : 25,
      };
      closeNotification();
      saveCompanyDetails(companyDetails)
    }
  };

  const saveCompanyDetails = async (companyDetails) => {

    try {
      const saveRequest = await patchProtected("/company/update", companyDetails);

      if (saveRequest.status){
        localStorage.setItem("company", saveRequest.data)
        toUploadDocuments()
      } else {
        showNotification(saveRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }

  const toUploadDocuments = () => {
    history.push("/due-diligence/upload-company-documents");
  }

  return (
    <div className="dueDiligence">
      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
      <a href="/">
        <img alt="logo" src={logo} className="logo" />
      </a>
      <div className="content">
        <div>
          <p className="oxfordText font24 headerText weight500">
            Great! Let’s set up your company
          </p>
          <p className="oxfordText font14 mt10">
            We just need a bit more information about company securely confirm
            your business identity and manage your corporate account. Progress
            is auto-saved so you can come back anytime to finish setting up your
            Pali account.
          </p>
        </div>

        <form onSubmit={(event) => validateFormData(event)}>
          <FormInput label="TIN" type="number" />

          <DropDown
            label="Category"
            type=""
            data={categoryNames}
            onSelect={(categoryIndex) => setCategory(categories[categoryIndex])}
          />

          <FormInput label="Description" type="" />

          <FormInput label="Website (Optional)" type="" />

          {!sameAddress && (
            <React.Fragment>
              <FormInput label="Address" type="text" />

              <div className="address">
                <FormInput label="City" type="text" />

                <FormInput label="State" type="text" />

                <DropDown
                  label="Country"
                  type=""
                  data={countryNames}
                  onSelect={(countryIndex) =>
                    setCountry(countries[countryIndex])
                  }
                />
              </div>
            </React.Fragment>
          )}

          <div className="sameAddress mt15">
            <input
              type="checkbox"
              onChange={(event) => handleSameAddressChange(event)}
            />
            <label>Same as Registered Address</label>
          </div>

          <div className="buttonContainer">
            <Button label="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUpCompany;
