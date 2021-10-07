import { useEffect, useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import closeIcon from "../../../Assets/img/closeIcon.svg";
import Modal from "../../../Components/Modal/modal";
import Info from "./Tabs/info";
import Policy from "./Tabs/policy";
import NumberInput from "../../../Components/FormInput/numberInput";
import Button from "../../../Components/Button/button";
import DropDown from "../../../Components/DropDown/dropDown";
import getProtected from "../../../helpers/requests/getProtected";
import Notification from "../../../Components/Notification/notification";
import { capitalize, getInitials } from "../../../helpers/formatStrings";
import postProtected from "../../../helpers/requests/postProtected";
import patchProtected from "../../../helpers/requests/patchProtected";
import DeleteItem from "../../../Components/DeleteItem/deleteItem";
import deleteProtected from "../../../helpers/requests/deleteProtected";
import Mileage from "./Tabs/mileage";

const AddApprover = ({ team, index, onSelect, selectedTeamMembers }) => {
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);

  useEffect(() => {
    if (selectedTeamMembers){
      setSelected()
    }
  }, [])

  const setSelected = () => {
    const temp = [...selectedApprovers]
    const temp2 = [...selectedIDs]

    selectedTeamMembers.users.map(item => {
      temp.push(item)
      temp2.push(item.user_id)
    })

    setSelectedApprovers(temp)
    setSelectedIDs(temp2)
  }

  const addToApprovers = (approver) => {
    if (!selectedIDs.includes(approver.user_id)) {
      setSelectedApprovers([...selectedApprovers, approver]);
      setSelectedIDs([...selectedIDs, approver.user_id]);
      onSelect([...selectedIDs, approver.user_id]);
    }
  };

  const removeFromSelectedApprovers = (id) => {
    var temp = [...selectedApprovers];
    var tempIDs = [...selectedIDs];
    temp = temp.filter((item) => item.user_id !== id);
    tempIDs = tempIDs.filter((item) => item !== id);
    setSelectedApprovers(temp);
    setSelectedIDs(tempIDs);
    onSelect(tempIDs);
  };

  return (
    <div>
      <div className="approverItem mt16">
        <div className="number mr16">
          <p className="font12 oxfordText">{index + 1}</p>
        </div>
        <div className="flexGrow1">
          <DropDown
            data={team}
            type="image list"
            hideLabel={true}
            placeholder="Add Approver(s)"
            onSelect={(index) => {
              addToApprovers(team[index]);
            }}
          />
        </div>
      </div>

      {selectedApprovers.map((item) => (
        <div className="selectedApproverItem">
          <div>{getInitials(item.name)}</div>
          <p>{item.name}</p>
          <img
            alt="remove icon"
            src={closeIcon}
            className="close"
            onClick={() => removeFromSelectedApprovers(item.user_id)}
          />
        </div>
      ))}
    </div>
  );
};



const Settings = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [team, setTeam] = useState([]);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [steps, setSteps] = useState([1]);
  const [fetchPolicyToggle, setFetchPolicyToggle] = useState(false)
  const [policyArray, setPolicyArray] = useState([]);
  const [policyToEdit, setPolicyToEdit] = useState([])
  const [policyToDelete, setPolicyToDelete] = useState("")



  useEffect(() => {
    getTeamMembers();
    
  }, []);

  const toggleFetchPolicyToggle = () => {
    if (fetchPolicyToggle){
      setFetchPolicyToggle(false)
    } else {
      setFetchPolicyToggle(true)
    }
  }


      

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

  const addStep = () => {
    setSteps([...steps, 1]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      event.target[0].value === "" ||
      event.target[0].value === 0 ||
      event.target[0].value === "0"
    ) {
      showNotification("An amount is required", "Error");
    } else if (Object.entries(policyToEdit).length === 0 && policyArray.length === 0){
      showNotification("Add at least one approver", "Error")
    } else {
      closeNotification()
      
      if (policyToEdit.amount){
        updatePolicy()
      } else {
        savePolicy(event.target[0].value);
      }
    }
  };

  const closeApproverModal = () => {
          var temp = [...policyArray];
          temp = [];
          setPolicyArray(temp);
          temp = [...steps];
          temp = [1];
          setSteps(temp);
          temp = {...policyToEdit}
          temp = {}
          setPolicyToEdit(temp)
          setShowAddPolicy(false);
          toggleFetchPolicyToggle()
  }

  const savePolicy = async (amount) => {
    try {
      const details = {
        amount: Number(amount),
        currency_id : 76,
        approver : policyArray
      }

      const savePolicyRequest = await postProtected("/policy", details);
      

      if (savePolicyRequest.status){
        showNotification("Policy added!", "Success");
        closeApproverModal()
      } else {
        showNotification(savePolicyRequest.message, "Error")
      }
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }

  const updatePolicy = async () => {
    // if (policyArray.length === 0){
    //   showNotification("You haven't added or edited a policy", "Error")
    //   return
    // }

    try {
      const details = {
        policy_id:policyToEdit.id,
        amount: Number(
          policyToEdit.amount.replace(",", "").replace(".", "").slice(1)
        ),
        approver: policyArray,
      };

      console.log(details);

      const updatePolicyRequest = await patchProtected(
        "/policy",
        details
      );

      if (updatePolicyRequest.status){
        console.log(updatePolicyRequest);
      } else {
        showNotification(updatePolicyRequest.message, "Error")
      }

      console.log(updatePolicyRequest);
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }

  const deletePolicy = async () => {
    try {
      const deletePolicyRequest = await deleteProtected("/policy", {policy_id: policyToDelete});
      
      if (deletePolicyRequest.status){
        showNotification("Policy deleted succesfully", "Success")
        setPolicyToDelete("")
        toggleFetchPolicyToggle()
      } else {
        showNotification(deletePolicyRequest.message, "Error")
      }
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }



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
              <img
                src={closeIcon}
                alt="close icon"
                className="close"
                onClick={() => closeApproverModal()}
              />
            </header>
            <hr />

            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div className="pl30 pr30 mt20">
                <p className="font14 oxfordText mb8">Amount</p>
                <p className="font12 secondaryColorText mb8">
                  When amount per requests is equal to or more than
                </p>
                <NumberInput
                  hideLabel="true"
                  placeholder="Enter Amount"
                  defaultValue={
                    Object.entries(policyToEdit).length > 0 &&
                    Number(
                      policyToEdit.amount
                        .replace(",", "")
                        .replace(".", "")
                        .slice(1)
                    )
                  }
                />
                <p className="font14 oxfordText mt24 mb15">
                  Then get approval from
                </p>
                <p className="font12 secondaryColorText mb8">
                  Define approver(s)
                </p>
                <div className="mb16">
                  {steps.map((item, index) => (
                    <AddApprover
                      index={index}
                      key={index}
                      team={team}
                      selectedTeamMembers={
                        Object.entries(policyToEdit).length > 0 &&
                        policyToEdit?.approver[index]
                      }
                      onSelect={(list) => {
                        if (policyArray.length < index.length + 1) {
                          const temp = [...policyArray];
                          temp.push({
                            level: index + 1,
                            user_ids: list,
                          });
                          setPolicyArray(temp);
                        } else {
                          const temp = [...policyArray];
                          temp[index] = {
                            level: index + 1,
                            user_ids: list,
                          };
                          setPolicyArray(temp);
                        }
                      }}
                    />
                  ))}
                </div>
                <span
                  className="blueLinkUnderlined font14"
                  onClick={() => {
                    addStep();
                  }}
                >
                  Add step
                </span>
                <div className="displayFlex flexJustifyEnd mt30 mb30">
                  <Button label="Save" />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {policyToDelete !== "" && (
        <Modal>
          <DeleteItem
            header="Delete Policy?"
            body="You are about to delete a policy. This cannot be undone. Continue?"
            closeModal={() => setPolicyToDelete("")}
            confirm={() => deletePolicy()}
          />
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

          
        }
      </div>
    </div>
  );
};

export default Settings;
