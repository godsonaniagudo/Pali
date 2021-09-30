import { useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import Button from "../../../Components/Button/button";
import FormInput from "../../../Components/FormInput/formInput";
import IconButton from "../../../Components/IconButton";
import Modal from "../../../Components/Modal/modal";
import { capitalize, getInitials } from "../../../helpers/formatStrings";
import close from "../../../Assets/img/closeIcon.svg"
import up from "../../../Assets/img/icons/up.svg";
import down from "../../../Assets/img/icons/down.svg";
import pass from "../../../Assets/img/icons/pass.svg";
import DropDown from "../../../Components/DropDown/dropDown";
import profileImage from "../../../Assets/img/profileImage.jpg"
import alertIcon from "../../../Assets/img/icons/alertIcon.svg"
import warningIcon from "../../../Assets/img/icons/warningIcon.svg"
import Notification from "../../../Components/Notification/notification";
import { validateEmail } from "../../../helpers/validators";
import postProtected from "../../../helpers/requests/postProtected";
import { useEffect } from "react";
import getProtected from "../../../helpers/requests/getProtected";
import React from "react";
import deleteProtected from "../../../helpers/requests/deleteProtected";

const DeleteEmployee = ({user, closeModal, closeUserModal}) => {
  const thisUser = JSON.parse(localStorage.getItem("user"))

  const deleteEmployee = async () => {
    try {
      console.log({thisUser});
      console.log({user});
      if (thisUser.user.user_id !== user.user_id){

        const deleteEmployeeRequest = await deleteProtected("/employee/" + user.user_id)

        if (deleteEmployeeRequest.status) {
          closeModal()
          closeUserModal()
        }
      }
      
    } catch (error) {
      
    }
  }

    return (
      <div className="deleteEmployee">
        <div className="deleteHeader">
          <img alt="close" src={close} className="close" onClick={() => closeModal()}  />
        </div>
        <img alt="alert" src={alertIcon} />
        <p className="oxfordText font16 mt20 weight600">
          {
            `Are you sure you want to delete ${user.name}?`
          }
        </p>
        <p className="charcoalText font14 mt20 mb20">
          This can not be undone. Please, keep in mind that deleting this user
          will permanently destroy their cards and remove their access to Pali.
        </p>
        <Button label="Delete" onClick={() => {
          deleteEmployee()
        }} />
      </div>
    );
}

const PersonDetails = ({user, closeModal, openDelete}) => {
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    getEmployeeDetails()
  }, [])

  const getEmployeeDetails = async () => {
    try {
      const getEmployeeRequest = await getProtected("/user/profile/" + user.user_id)

      if (getEmployeeRequest.status){
        var temp = {...employee}
        temp = getEmployeeRequest.data
        setEmployee(temp)
      }
    } catch (error) {
      
    }
  }


    return (
      <div className="personDetails">
        <div className="personDetailsHeader">
          <div>
            <img alt="up" src={up} />
            <img alt="down" src={down} />
          </div>

          <img alt="close" src={close} onClick={() => closeModal()} />
        </div>

        <div>
          <div>
            <p className="ml20 font13 oxfordText">General Details</p>

            <div className="personDetailsUser mt20">
              <img src="avatar" src={profileImage} />
              <p className="font14 oxfordText ml15">{user.name}</p>
            </div>

            <div className="personalDetailsForm mb20">
              <FormInput label="WORK EMAIL" defaultValue={user.email}  />
              <FormInput label="EMPLOYEE CODE" defaultValue={user.user_id} />

              <FormInput label="PHONE NUMBER" defaultValue={user.phone} />
              <DropDown data={[]} label="ROLE" defaultValue={user.role} />
            </div>
          </div>

          <hr />

          <div className="personalDetailsBank">
            <p className="font12 oxfordText weight600">Bank Account</p>

            <div className="personalDetailsBankDetails mt10">
              <div className="bankHeader">
                <img alt="valid" src={employee?.counterparty?.account_name === ""  ? warningIcon : pass} className="mr10" />
                <p className="font12 oxfordText">
                  {
                    employee?.counterparty?.account_name === "" ? `${user.name} is not set up to receive reimbursement` : `${user.name} can receive bank transfers`
                  }
                </p>
              </div>

              <hr />

              {
                !employee?.counterparty?.account_name === "" && <React.Fragment>
                  <div className="bank">
                <div className="bankHeader">
                  <p className="font14 oxfordText">{employee?.counterparty?.bank_name + " " + employee?.counterparty?.account_number}</p>
                  <div>
                    <img />
                    <p className="font12 oxfordText">Active</p>
                  </div>
                </div>

                <hr />

                <div className="bankBody">
                  <div>
                    <p className="font10 secondaryColorText">BANK</p>
                    <p className="font13 oxfordText mt10 mb20">{employee?.counterparty?.bank_name}</p>

                    <hr />

                    <p className="font10 secondaryColorText mt20">
                      ACCOUNT NAME
                    </p>
                    <p className="font13 oxfordText mt10">{employee?.counterparty?.account_name}</p>
                  </div>

                  <div>
                    <p className="font10 secondaryColorText">ACCOUNT NUMBER</p>
                    <p className="font13 oxfordText mt10">{employee?.counterparty?.account_number}</p>
                  </div>
                </div>
              </div>
                </React.Fragment>
              }
            </div>
          </div>

          <p className="deleteText" onClick={() => openDelete()}>Delete employee</p>
        </div>
      </div>
    );
}

const Invite = ({closeModal, showNotification, onSuccess}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (event.target[0].value === ""){
      showNotification("Please enter the employee's email addrress")
    } else if (!validateEmail(event.target[0].value)) {
      showNotification("Please enter a valid email address")
    } else {
      sendInvite(event.target[0].value)
    }
  }

  const sendInvite = async (email) => {
    try {
      const sendInviteRequest = await postProtected("/invite/user", {
        email
      })
      
      if (sendInviteRequest.status){
        onSuccess("Invite sent successfully")
        closeModal()
      } else {
        showNotification(sendInviteRequest.message)
      }
    } catch (error) {
      showNotification(error.message)
    }
  }

    return (
      <div className="invite">
        <div className="inviteHeader">
          <p className="oxfordText weight600">Invite A Team Member</p>
          <img alt="close" src={close} onClick={() => closeModal()} />
        </div>

        <hr />

        <div className="inviteBody">
          <p className="oxfordText font14">We’ll email them with all the details on how to get started.</p>
          <form onSubmit={event => handleSubmit(event)}>
            <FormInput label="Email address" />

          <div className="buttonContainer mt15 buttonContainer">
            <Button label="Send Invite" />
          </div>
          </form>
        </div>
      </div>
    );
}

const People = () => {
  const [showModal, setShowModal] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState("")
  const [people, setPeople] = useState([]);
  const [currentUser, setCurrentUser] = useState({})

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

  const [showAddEmployees, setShowAddEmployees] = useState(false)

  const toggleAddEmployeesModal = () => {
    if (showAddEmployees){
      setShowAddEmployees(false)
    } else {
      setShowAddEmployees(true)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = async () => {
    try {
      const getEmployeeRequest = await getProtected("/users")

      if (getEmployeeRequest.status) {
        var temp = [...people]
        temp = getEmployeeRequest.data.users
        setPeople(temp)
      } else if (!getEmployeeRequest.status) {
        showNotification(getEmployeeRequest.message, "Error")
      }
    } catch (error) {
      showNotification(error.message, "Error")
    }
  }


  return (
    <div className="people">
      {
        showModal === "add employees" && <Modal>
          <Invite closeModal={() => setShowModal("")} showNotification={text => showNotification(text, "Error")} onSuccess={text => showNotification(text, "Success")} />
      </Modal>
      }

      {
        showModal === "user" && <Modal>
          < PersonDetails user = {
            currentUser
          }
          openDelete = {
            () => setShowDeleteModal("delete employee")
          }
          closeModal = {
              () => {
            setShowModal("")
          }} />
        </Modal>
      }

      {
        showDeleteModal === "delete employee" && <Modal>
          <DeleteEmployee user={currentUser} closeModal={() => {
            setShowDeleteModal("")
          }} closeUserModal={() => {
            setShowModal("")
          }} />
        </Modal>
      }

      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
      
      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />{" "}
          <input placeholder="Search Expense, Members, Reimbbursments etc." />
        </div>
        <div className="navRight mr20">
          <p className="font13 mr10 weight600 addEmployees" onClick={() => {
            setShowModal("add employees")
          }}> Add Employees </p>

          <IconButton text="New Request" />
        </div>{" "}
      </nav>
      <div className="body">
        <h1 className="weight500 oxfordText font20"> People </h1>

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
              <tr key={index} className="personItem" onClick={() => {
                setShowModal("user")
                var temp = {...currentUser}
                temp = item
                setCurrentUser(temp)
              }}>
                <td>
                  <div className="personNameAndType">
                    <div className="imagePlaceholder font13 mr15">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <p className="font14 weight500 oxfordText">{item.name}</p>
                      <p className="font13 secondaryColorText mt5">{capitalize(item.role)}</p>
                    </div>
                  </div>
                </td>
                <td className="oxfordText">{item.email}</td>
                <td className="oxfordText">{item.team}</td>
                <td className="oxfordText">{capitalize(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
