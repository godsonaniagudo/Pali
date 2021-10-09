import searchIcon from "../../../Assets/img/searchIcon.svg";
import Accordion from "../../../Components/Accordion/accordion";
import FormInput from "../../../Components/FormInput/formInput";
import NumberInput from "../../../Components/FormInput/numberInput";
import plainAlertIcon from "../../../Assets/img/icons/plainAlertIcon.svg";
import Button from "../../../Components/Button/button";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../Components/Modal/modal";
import BorderedArea from "../../../Components/BorderedArea/borderedArea";
import closeIcon from "../../../Assets/img/closeIcon.svg";
import DropDown from "../../../Components/DropDown/dropDown";
import getProtected from "../../../helpers/requests/getProtected";
import Notification from "../../../Components/Notification/notification";
import { capitalize } from "../../../helpers/formatStrings";
import postProtected from "../../../helpers/requests/postProtected";

const Profile = () => {
  const formRef = useRef(null)
  const [hasAccount, setHasAccount] = useState(false);
  const [modal, setModal] = useState("")
  const [banks, setBanks] = useState([])
  const [bankNames, setBankNames] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataValid, setDataValid] = useState(false)
  const [selectedBank, setSelectedBank] = useState({})
  const [verifying, setVerifying] = useState(false)
  const [accountName, setAccountName] = useState("")


  useEffect(() => {
    getBanks()
  }, [])

  const getBanks = async () => {
      try {
          const getBanksRequest = await getProtected("/banks")

          if (getBanksRequest.status){
            var tempBankNames = [...bankNames]
            tempBankNames = getBanksRequest.data.map((item) => item.name);
            setBankNames(tempBankNames)
            setBanks(getBanksRequest.data);
          } else {
              showNotification(getBanksRequest.message, "Error")
          }
      } catch (error) {
          showNotification(error.message, "Error")
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

  const validateData = (event) => {
    event.preventDefault()

    if (
      Object.values(selectedBank).length === 0 ||
      event.target.value === "" ||
      event.target.value === ""
    ) {
      setAccountName("")
        setDataValid(false)
    } else {
        setDataValid(true)

        

        if (event.target.value.length === 10 && Object.values(selectedBank).length > 0) {
                  const details = {
                    bank_id: Number(selectedBank.id),
                    account_number: String(event.target.value),
                  };
            verifyBankAccount(details)
        } else {
          setAccountName("")
        }
    }

    
      
  }

  const verifyBankAccount = async (details) => {
    setVerifying(true)
    try {
      const verifyAccountRequest = await postProtected("/bank/verify", details);

      if (verifyAccountRequest.status) {
        setAccountName(verifyAccountRequest.data.account_name)
      } else {
        setAccountName("")
        showNotification(verifyAccountRequest.message, "Error");
      }
      setVerifying(false)
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }

  const handleSubmit = async (event) => {
      event.preventDefault()

      if (dataValid){
        closeNotification()
        const details = {
          bank_id: Number(selectedBank.id),
          account_number: String(event.target[0].value),
          account_name: accountName
        };

        saveAccount(details)
      } else {
        showNotification("Your account details have not been verified", "Error")
      }
  }

  console.log({selectedBank});


  const saveAccount = async (details) => {
    console.log(details);
    try {
      const saveAccountRequest = await postProtected("/bank/account", details);

      if (saveAccountRequest.status) {
        showNotification("Successfully saved your account details.")
      } else {
        showNotification(saveAccountRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  return (
    <div className="profile pr30">
      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
      {modal === "add bank" && (
        <Modal>
          <BorderedArea>
            <header>
              <p className="font14 oxfordText">Add Vendor Bank Account</p>
              <img alt="close" src={closeIcon} onClick={() => setModal("")} />
            </header>

            <hr />

            <form className="addBankForm" ref={formRef} onSubmit={event => handleSubmit(event)} onChange={event => {
                validateData(event)
            }}>
              <div className="pl20 pb20 pr20">
                <div className="displayFlex flexJustifyBetween top">
                  <DropDown disabled={verifying} label="BANK" data={bankNames} onSelect={index => setSelectedBank(banks[index])} />
                  <NumberInput disabled={verifying} label="ACCOUNT NUMBER" placeholder="e.g 1230" />
                </div>

                <FormInput label="ACCOUNT NAME" disabled={true} defaultValue={accountName} />
              </div>
              <div className="pl20 pb20 pr20 pt30 displayFlex flexJustifyEnd">
                <Button label="Add Bank Account" />
              </div>
            </form>
          </BorderedArea>
        </Modal>
      )}

      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />
          <input
            placeholder="Search Expense, Members, Reimbbursments etc."
            type="text"
          />
        </div>
      </nav>

      <p className="font20 oxfordText weight600 mt30">My Profile</p>

      <div className="user mt30 flexAlignCenter">
        <div className="userAvatar">
          <div className="placeholder"></div>
        </div>

        <div className="userDetails pl20">
          <p disabled={true} className="font16 oxfordText weight500">{`${user.user.firstname} ${user.user.lastname}`}</p>
          <p disabled={true} className="font14 oxfordText mt5">{user.user.email}</p>
        </div>
      </div>

      <div className="mt20">
        <Accordion status={true} label="Your Info">
          <div className="pl20 pb20 pr20">
            <form>
              <div className="displayFlex fullWidth mb20">
                <FormInput
                  label="FIRST NAME"
                  type="email"
                  defaultValue={user.user.firstname}
                  disabled={true}
                />
                <FormInput
                  label="LAST NAME"
                  type="email"
                  defaultValue={user.user.lastname}
                  disabled={true}
                />
              </div>

              <div className="displayFlex fullWidth mb20">
                <FormInput
                  label="WORK EMAIL"
                  type="email"
                  defaultValue={user.user.email}
                  disabled={true}
                />
                <NumberInput
                  label="PHONE NUMBER"
                  defaultValue={Number(user.user.phone)}
                  disabled={true}
                />
              </div>
            </form>
          </div>
        </Accordion>
      </div>

      <div className="security mt20">
        <Accordion status={false} label="Security">
          <div className="p20">
            <span className="displayFlex flexAlignCenter mb5">
              <img alt="alert" src={plainAlertIcon} />
              <p className="font13 oxfordText ml10">
                To reset your password, click the button below and a reset link
                will be sent to your account email address.
              </p>
            </span>
            <div className="pb20">
              <FormInput label="PASSWORD" type="password" side="Reset" disabled={true} />
            </div>
          </div>
        </Accordion>
      </div>

      <div className="mt20">
        <Accordion status={false} label="Bank Account">
          <div className="p20">
            <span className="displayFlex flexAlignCenter mb20">
              <img alt="alert" src={plainAlertIcon} />
              <p className="font13 oxfordText ml10">
                {
                  user.counterparty.account_number !== ""
                  ? "An overview of your reimbursement account. For security reasons, you should contact your Account owner to change it safely."
                  : "Add your bank account information in order to receive reimbursement on time and seamlessly by your employer."}
              </p>
            </span>

            {user.counterparty.account_number === "" && (
              <div>
                <Button
                  label="Add a bank account"
                  onClick={() => {
                    setModal("add bank");
                  }}
                />
              </div>
            )}

            {
              user.counterparty.account_number !== "" && (
              <div className="bankDetails">
                <div className="displayFlex">
                  <FormInput label="BANK" type="text" defaultValue={user.counterparty.bank_name} disabled={true} />
                  <FormInput label="ACCOUNT NUMBER" defaultValue={Number(user.counterparty.account_number)} disabled={true} />
                </div>

                <FormInput label="ACCOUNT NAME" type="text" defaultValue={user.counterparty.account_name} disabled={true} />
              </div>
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default Profile;
