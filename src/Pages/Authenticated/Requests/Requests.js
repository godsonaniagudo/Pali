import { useEffect, useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import getProtected from "../../../helpers/requests/getProtected";
import Notification from "../../../Components/Notification/notification";
import { capitalize, getInitials } from "../../../helpers/formatStrings";
import IconButton from "../../../Components/IconButton";
import closeIcon from "../../../Assets/img/closeIcon.svg"
import Modal from "../../../Components/Modal/modal";
import "./styles/styles.css"
import Button from "../../../Components/Button/button";
import FormInput from "../../../Components/FormInput/formInput";
import NumberInput from "../../../Components/FormInput/numberInput";
import DropDown from "../../../Components/DropDown/dropDown";
import uploadIcon from "../../../Assets/img/icons/uploadIcon.svg"




const Requests = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [team, setTeam] = useState([]);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [steps, setSteps] = useState([1]);
  const [fetchPolicyToggle, setFetchPolicyToggle] = useState(false)
  const [policyArray, setPolicyArray] = useState([]);
  const [policyToEdit, setPolicyToEdit] = useState([])
  const [policyToDelete, setPolicyToDelete] = useState("")



  useEffect(() => {
    
    
  }, []);

  const toggleFetchPolicyToggle = () => {
    if (fetchPolicyToggle){
      setFetchPolicyToggle(false)
    } else {
      setFetchPolicyToggle(true)
    }
  }


      


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

      <Modal>
          <div className="createReimbursementModal">
            <div className="body">
                <div className="left">
                  <div>
                    <div className="uploadPrompt displayFlex flexAlignCenter flexJustifyCenter">
                        <div className="cursorPointer displayFlex flexColumn flexAlignCenter">
                          <img alt="select file icon" src={uploadIcon} />
                          <p className="font12 oxfordText weight400 mt10">Please upload a receipt for this expense</p>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                    <header>
                        <p className="font14 oxfordText weight600">New Out-Of-Pocket Expense</p>
                        <img alt="close" src={closeIcon} />
                    </header>

                    <hr />

                    <div className="bodyContent">
                        <div className="outOfPocket">
                            <FormInput label="MERCHANT NAME" />

                            <NumberInput label="AMOUNT" side="NGN" />

                            <FormInput label="TRANSACTION DATE" />

                            <div className="mb24">
                              <DropDown label="CATEGORY" placeholder="Select a category" data={[]} />
                            </div>

                            <div className="mb50">
                              <FormInput label="NOTE" placeholder="Add a business purpose to this expense.
                                Example: Client meeting - Acme.com" />
                            </div>

                          <p className="font12 oxfordText weight600 mt24">Additional Details</p>
                          <div className="mb50">
                            <FormInput label="TAGS" />
                          </div>

                          <p className="font12 oxfordText weight600 mt24">Approvals</p>
                          <p className="font12 secondaryColorText mt16">Require approval from one of the following team members</p>
                          <DropDown label="1ST APPRROVAL" data={[]} />
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <button className="cancelButton oxfordText">Cancel</button>
                <Button label="Submit" />
            </footer>
          </div>
      </Modal>



      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />
          <input placeholder="Search Expense, Members, Reimbbursments etc." />
        </div>

        <div className="navRight">
            <IconButton text="Create Reimbursement" />
        </div>
      </nav>

      <h1 className="mt20 oxfordText font20 weight500 mb20">Settings</h1>

      <div className="settingsContent">
        <div className="displayFlex topNav">
          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "inbox" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("inbox");
            }}
          >
            <p className="font13">Inbox</p>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "pending" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("pending");
            }}
          >
            <div className="displayFlex">
              <p className="font13">Pending</p>
              <img />
            </div>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "outstanding" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("outstanding");
            }}
          >
            <p className="font13">Outstanding</p>
            <div className="indicator"></div>
          </div>



          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "settled" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("settled");
            }}
          >
            <p className="font13">Settled</p>
            <div className="indicator"></div>
          </div>


          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "denied" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("denied");
            }}
          >
            <p className="font13">Denied</p>
            <div className="indicator"></div>
          </div>
        </div>
        <hr className="topDivider" />

        {/* {activeTab === "info" && <Info />}

        {activeTab === "policy" && (
          <Policy
            showAdd={() => setShowAddPolicy(true)}
            hideAdd={() => setShowAddPolicy(false)}
            showNotification={(message, type) =>
              showNotification(message, type)
            }
            deletePolicy={(policyID) => {
              setPolicyToDelete(policyID);
            }}
            fetchPolicyToggle={fetchPolicyToggle}
            editPolicy={(policy) => {
              var temp = { ...policyToEdit };
              temp = policy;
              console.log(temp);
              temp.approver.forEach((element) => {
                const stepTemp = [...steps];
                stepTemp.push(1);
                setSteps(stepTemp);
              });
              setPolicyToEdit(temp);
              setShowAddPolicy(true);
            }}
          />
        )}

        {
          activeTab === "mileage" && 
            <Mileage showNotification={(text,type) => showNotification(text,type)} /> 
        } */}
      </div>
    </div>
  );
};

export default Requests;
