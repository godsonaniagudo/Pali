import Button from "../../Components/Button/button";
import FormInput from "../../Components/FormInput/formInput";
import logo from "../../Assets/img/logoPlain.svg";
import "./styles/styles.css";
import DropDown from "../../Components/DropDown/dropDown";
import { categories, states } from "../../helpers/presets";
import React, { useState } from "react";

const SetUpCompany = () => {
  const [sameAddress, setSameAddress] = useState(false);

  const handleSameAddressChange = event => {
      setSameAddress(event.target.checked);
  }

  return (
    <div className="dueDiligence">
      <img alt="logo" src={logo} className="logo" />
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

        <FormInput label="TIN" type="number" />

        <DropDown label="Category" type="" data={categories} />

        <FormInput label="Description" type="" />

        <FormInput label="Website (Optional)" type="" />

        {!sameAddress && (
          <React.Fragment>
            <FormInput label="Address" type="password" />

            <div className="address">
              <FormInput label="City" type="text" />

              <DropDown label="State" type="" data={states} />

              <FormInput label="Country" type="text" />
            </div>
          </React.Fragment>
        )}

        <div className="sameAddress mt15">
          <input type="checkbox" onChange={event => handleSameAddressChange(event)} />
          <label>Same as Registered Address</label>
        </div>

        <div className="buttonContainer">
          <Button label="Continue" />
        </div>
      </div>
    </div>
  );
};

export default SetUpCompany;
