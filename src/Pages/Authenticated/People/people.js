import { useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import Button from "../../../Components/Button/button";
import FormInput from "../../../Components/FormInput/formInput";
import IconButton from "../../../Components/IconButton";
import Modal from "../../../Components/Modal/modal";
import { getInitials } from "../../../helpers/formatStrings";
import close from "../../../Assets/img/closeIcon.svg"
import up from "../../../Assets/img/icons/up.svg";
import down from "../../../Assets/img/icons/down.svg";
import pass from "../../../Assets/img/icons/pass.svg";
import DropDown from "../../../Components/DropDown/dropDown";
import profileImage from "../../../Assets/img/profileImage.jpg"
import alertIcon from "../../../Assets/img/icons/alertIcon.svg"

const DeleteEmployee = () => {
    return (
      <div className="deleteEmployee">
        <img alt="alert" src={alertIcon} />
        <p className="oxfordText font16 mt20 weight600">
          Are you sure you want to delete John Doe?
        </p>
        <p className="charcoalText font14 mt20 mb20">
          This can not be undone. Please, keep in mind that deleting this user
          will permanently destroy their cards and remove their access to Pali.
        </p>
        <Button label="Delete" />
      </div>
    );
}

const PersonDetails = () => {
    return (
      <div className="personDetails">
        <div className="personDetailsHeader">
          <div>
            <img alt="up" src={up} />
            <img alt="down" src={down} />
          </div>

          <img alt="close" src={close} />
        </div>

        <div>
          <div>
            <p className="ml20 font13 oxfordText">General Details</p>

            <div className="personDetailsUser mt20">
              <img src="avatar" src={profileImage} />
              <p className="font14 oxfordText ml15">Ade Doe</p>
            </div>

            <div className="personalDetailsForm mb20">
              <FormInput label="WORK EMAIL" />
              <FormInput label="EMPLOYEE CODE" />

              <FormInput label="PHONE NUMBER" />
              <DropDown data={[]} label="ROLE" />
            </div>
          </div>

          <hr />

          <div className="personalDetailsBank">
            <p className="font12 oxfordText weight600">Bank Account</p>

            <div className="personalDetailsBankDetails mt10">
              <div className="bankHeader">
                <img alt="valid" src={pass} className="mr10" />
                <p className="font12 oxfordText">
                  Ade can receive bank transfers
                </p>
              </div>

              <hr />

              <div className="bank">
                <div className="bankHeader">
                  <p className="font14 oxfordText">Stanbic IBTC *****4500</p>
                  <div>
                    <img />
                    <p className="font12 oxfordText">Active</p>
                  </div>
                </div>

                <hr />

                <div className="bankBody">
                  <div>
                    <p className="font10 secondaryColorText">BANK</p>
                    <p className="font13 oxfordText mt10 mb20">Stanbic IBTC</p>

                    <hr />

                    <p className="font10 secondaryColorText mt20">
                      ACCOUNT NAME
                    </p>
                    <p className="font13 oxfordText mt10">Adeyemo Adedeji</p>
                  </div>

                  <div>
                    <p className="font10 secondaryColorText">ACCOUNT NUMBER</p>
                    <p className="font13 oxfordText mt10">05111109892</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="deleteText">Delete employee</p>
        </div>
      </div>
    );
}

const Invite = () => {
    return (
      <div className="invite">
        <div className="inviteHeader">
          <p className="oxfordText weight600">Invite A Team Member</p>
          <img alt="close" src={close} />
        </div>

        <hr />

        <div className="inviteBody">
          <p>We’ll email them with all the details on how to get started.</p>
          <FormInput label="Email address" />

          <div className="buttonContainer mt15">
            <Button label="Send Invite" />
          </div>
        </div>
      </div>
    );
}

const People = () => {
  const [people, setPeople] = useState([
    {
      name: "Person 1",
      email: "person1@gmail.com",
      type: "Account Owner",
      team: "Management",
      status: "Active",
    },
    {
      name: "Person",
      email: "person1@gmail.com",
      type: "Account Owner",
      team: "Management",
      status: "Active",
    },
    {
      name: "Person 1",
      email: "person1@gmail.com",
      type: "Account Owner",
      team: "Management",
      status: "Active",
    },
    {
      name: "Person 1",
      email: "person1@gmail.com",
      type: "Account Owner",
      team: "Management",
      status: "Active",
    },
    {
      name: "Person 1",
      email: "person1@gmail.com",
      type: "Account Owner",
      team: "Management",
      status: "Active",
    },
  ]);
  return (
    <div className="people">
      {/* <Modal>

      </Modal> */}
      
      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />{" "}
          <input placeholder="Search Expense, Members, Reimbbursments etc." />
        </div>
        <div className="navRight mr20">
          <p className="font13 mr10 weight600"> Add Employees </p>

          <IconButton text="New Request" />
        </div>{" "}
      </nav>
      <div className="body">
        <h1> People </h1>

        <div className="bodyHeader">
          <span>
            <div className="headerItem ">
              <p className="font14 activeP"> Everyone </p>{" "}
              <div className="activeDiv"> </div>{" "}
            </div>{" "}
          </span>
        </div>

        <hr />

        <table>
          <tbody>
            <tr>
              <td className="font13 secondaryColorText"> Name </td>{" "}
              <td className="font13 secondaryColorText"> Email </td>{" "}
              <td className="font13 secondaryColorText"> Team </td>{" "}
              <td className="font13 secondaryColorText"> Status </td>{" "}
            </tr>

            {people.map((item, index) => (
              <tr key={index} className="personItem">
                <td>
                  <div className="personNameAndType">
                    <div className="imagePlaceholder font13 mr15">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <p className="font14 weight600 oxfordText">{item.name}</p>
                      <p className="font13 secondaryColorText">{item.type}</p>
                    </div>
                  </div>
                </td>
                <td className="oxfordText">{item.email}</td>
                <td className="oxfordText">{item.team}</td>
                <td className="oxfordText">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
