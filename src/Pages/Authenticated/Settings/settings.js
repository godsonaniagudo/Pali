import { useEffect, useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import closeIcon from "../../../Assets/img/closeIcon.svg"
import Modal from "../../../Components/Modal/modal";
import Info from "./Tabs/info";
import Policy from "./Tabs/policy";
import NumberInput from "../../../Components/FormInput/numberInput";
import Button from "../../../Components/Button/button";
import DropDown from "../../../Components/DropDown/dropDown";
import getProtected from "../../../helpers/requests/getProtected";
import Notification from "../../../Components/Notification/notification";
import { capitalize } from "../../../helpers/formatStrings";

const AddApprover = ({team}) => {
  const [selectedApprovers, setSelectedApprovers] = useState([])

  return (
    <div className="approverItem">
      <div className="number mr16">
        <p className="font12 oxfordText">1</p>
      </div>
      <div className="flexGrow1">
        <DropDown
          data={team}
          type="image list"
          hideLabel={true}
          placeholder="Add Approver(s)"
          onSelect={(index) => {
            console.log(index);
          }}
        />
      </div>
    </div>
  );
}

const Settings = () => {
    const [activeTab, setActiveTab] = useState("info")
    const [team, setTeam] = useState([])
    const [showAddPolicy, setShowAddPolicy] = useState(false)
    
    useEffect(() => {
      getTeamMembers()
    }, [])

      const getTeamMembers = async () => {
        try {
          const getEmployeeRequest = await getProtected("/users");

          if (getEmployeeRequest.status) {
            var temp = [...team];
            temp = getEmployeeRequest.data.users;
            setTeam(temp);
          } else if (!getEmployeeRequest.status) {
            showNotification(getEmployeeRequest.message, "Error");
          }
        } catch (error) {
          showNotification(error.message, "Error");
        }
      };


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

  return (
    <div className="settings">
      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}

      {showAddPolicy && (
        <Modal>
          <div className="newRuleModal">
            <header className="displayFlex flexJustifyBetween">
              <p>New Rule</p>
              <img src={closeIcon} alt="close icon" className="close" onClick={() => setShowAddPolicy(false)} />
            </header>
            <hr />

            <div className="pl30 pr30 mt20">
              <p className="font14 oxfordText mb8">Amount</p>
              <p className="font12 secondaryColorText mb8">
                When amount per requests is equal to or more than
              </p>
              <NumberInput hideLabel="true" placeholder="Enter Amount" />
              <p className="font14 oxfordText mt24 mb15">
                Then get approval from
              </p>
              <p className="font12 secondaryColorText mb8">
                Define approver(s)
              </p>
              <div className="mb16">
                <AddApprover team={team} />
              </div>
              <span className="blueLinkUnderlined font14">Add step</span>
              <div className="displayFlex flexJustifyEnd mt30 mb30">
                <Button label="Save" />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />
          <input placeholder="Search Expense, Members, Reimbbursments etc." />
        </div>

        <div className="navRight"></div>
      </nav>

      <h1 className="mt20 oxfordText font20 weight500 mb20">Settings</h1>

      <div className="settingsContent">
        <div className="displayFlex topNav">
          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "info" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("info");
            }}
          >
            <p className="font13">Company Info</p>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "policy" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("policy");
            }}
          >
            <div className="displayFlex">
              <p className="font13">Policy</p>
              <img />
            </div>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "mileage" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("mileage");
            }}
          >
            <p className="font13">Mileage</p>
            <div className="indicator"></div>
          </div>
        </div>
        <hr className="topDivider" />

        {activeTab === "info" && <Info />}

        {activeTab === "policy" && <Policy showAdd={() => setShowAddPolicy(true)} hideAdd={() => setShowAddPolicy(false)} />}
      </div>
    </div>
  );
};

export default Settings;
