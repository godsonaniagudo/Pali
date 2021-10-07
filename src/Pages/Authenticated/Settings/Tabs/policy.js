import { useEffect, useState } from "react";
import Button from "../../../../Components/Button/button";
import DropDown from "../../../../Components/DropDown/dropDown";
import Modal from "../../../../Components/Modal/modal";
import getProtected from "../../../../helpers/requests/getProtected";

const PolicyItem = ({details, editPolicy, deletePolicy}) => {
  return (
    <div className="policyItem">
      <header>
        <div className="font14 oxfordText displayFlex">
          Any amount equal to or greater than &nbsp;{" "}
          <p className="weight700">{details.amount}</p>
        </div>
        <div>
          <p className="edit font12" onClick={() => {
              editPolicy()
          }}>Edit</p>
          <p className="delete font12" onClick={() => deletePolicy()}>Delete</p>
        </div>
      </header>
      <p className="font13 mt16 oxfordText">Approver(s)</p>
      {details.approver.map((item, index) => (
        <div className="displayFlex mt16">
          <div className="optionsIcon"></div>
          <p className="font14 oxfordText">
            <span className="require">Require</span>
            {` ${item.users[0].name}`}
            {item.users.length > 0 && item.users.slice(1).map(arrItem => ` or ${arrItem.name}`)}
          </p>
        </div>
      ))}
    </div>
  );
};

const Policy = ({
  showAdd,
  showNotification,
  editPolicy,
  deletePolicy,
  fetchPolicyToggle,
}) => {
  const [selectedTab, setSelectedTab] = useState("claims");
  const [policies, setPolicies] = useState([]);
  const arrr = [1, 2, 3, 4, 5];

  useEffect(() => {
    getPolicies();
  }, [fetchPolicyToggle]);

  const getPolicies = async () => {
    try {
      const getPoliciesRequest = await getProtected("/policy");
      if (getPoliciesRequest.status) {
        var temp = [...policies];
        temp = getPoliciesRequest.data;
        setPolicies(temp);
      } else {
        showNotification(getPoliciesRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  return (
    <div className="policy">
      <DropDown data={[]} hideLabel={true} placeholder="Default Policy" />

      <div className="tabs displayFlex">
        <div
          className={`cursorPointer tabItem ${
            selectedTab === "claims" ? "active" : "passive"
          }`}
          onClick={() => setSelectedTab("claims")}
        >
          <p className="tabTitle pr10 font13">Claims</p>
          <div className="tabIndicator"></div>
        </div>

        <div
          className={`cursorPointer tabItem ${
            selectedTab === "bills" ? "active" : "passive"
          }`}
          onClick={() => setSelectedTab("bills")}
        >
          <p className="tabTitle pr10 pl10 font13">Bills</p>
          <div className="tabIndicator"></div>
        </div>

        <div
          className={`cursorPointer tabItem ${
            selectedTab === "purchase order" ? "active" : "passive"
          }`}
          onClick={() => setSelectedTab("purchase order")}
        >
          <p className="tabTitle pr10 pl10 font13">Purchase Order</p>
          <div className="tabIndicator"></div>
        </div>
      </div>

      <hr />

      {selectedTab === "claims" && (
        <div>
          <div className="mt20">
            <div className="policiesContainer">
              {policies.map((item) => (
                <PolicyItem
                  details={item}
                  editPolicy={() => editPolicy(item)}
                  deletePolicy={() => {
                    deletePolicy(item.id);
                  }}
                />
              ))}
            </div>
            <Button
              label="Add Policy"
              onClick={() => {
                showAdd();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Policy;
