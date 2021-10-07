import React, { useEffect, useState } from "react";
import searchIcon from "../../../Assets/img/searchIcon.svg";
import closeIcon from "../../../Assets/img/closeIcon.svg";
import Modal from "../../../Components/Modal/modal";
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
import Categories from "./Tabs/categories";
import CustomTags from "./Tabs/customTags";
import FormInput from "../../../Components/FormInput/formInput";
import ActionInput from "../../../Components/FormInput/actionInput";

const Accounting = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [globalTags, setGlobalTags] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [selectedGlobalTag, setSelectedGlobalTag] = useState({});
  const [selectedCustomField, setSelectedCustomField] = useState({});
  const [tagCounter, setTagCounter] = useState([1]);
  const [newTags, setNewTags] = useState([]);
  const [customName, setCustomName] = useState("");
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState({});
  const [showDeleteField, setShowDeleteField] = useState(false)
  const [fieldToDelete, setFieldToDelete] = useState("")
  const [fetchFields, setFetchFields] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState("");

  useEffect(() => {
    getGlobalTags();
  }, []);

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

  const closeDeleteModal = () => {
    setCategoryToDelete("");
    setShowDeleteCategory(false);
  };

  const deleteCategory = async () => {
    try {
      const deleteCategoryRequest = await deleteProtected("", {});
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const getGlobalTags = async () => {
    try {
      const getGlobalTagsRequest = await getProtected(
        "/accounting/custom/fields"
      );

      if (getGlobalTagsRequest.status) {
        var temp = [...globalTags];
        temp = getGlobalTagsRequest.data.map((item) => item.name);
        temp.push("Custom");
        setGlobalTags(temp);
        temp = [...customFields];
        temp = getGlobalTagsRequest.data;
        setCustomFields(temp);
      } else {
        showNotification(getGlobalTagsRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const validateData = (event) => {
    event.preventDefault();

    if (selectedGlobalTag === "Custom" && customName === "") {
      showNotification("Custom name is required", "Error");
    } else if (newTags.length === 0) {
      showNotification("Add at least one tag", "Error");
    } else {
      closeNotification();

      if (selectedGlobalTag === "Custom") {
        const data = {
          name: customName,
          tags: newTags,
        };
        createCustomField(data);
      } else {
        console.log({ selectedGlobalTag });
        const data = {
          id: selectedCustomField.id,
          tags: newTags,
        };
        addTags(data);
      }
    }
  };

  const createCustomField = async (data) => {
    try {
      const createCustomFieldRequest = await postProtected(
        "/accounting/custom/field",
        data
      );

      if (createCustomFieldRequest.status) {
        showNotification(
          "Custom field created and tags added successfully",
          "Success"
        );
        closeAddTagsModal();
        toggleFetchFields()
        getGlobalTags()
      } else {
        showNotification(createCustomFieldRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const addTags = async (data) => {
    try {
      const addTagsRequest = await postProtected("/accounting/tag", data);

      if (addTagsRequest.status) {
        showNotification("Tags added successfully", "Success");
        closeAddTagsModal();
        toggleFetchFields()
      } else {
        showNotification(addTagsRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const closeAddTagsModal = () => {
    var temp = [...newTags];
    temp = [];
    setNewTags(temp);
    temp = [...tagCounter];
    temp = [1];
    setTagCounter(temp);
    if (selectedGlobalTag === "Custom") {
      temp = selectedGlobalTag;
    } else {
      temp = { ...selectedGlobalTag };
    }
    temp = {};
    temp = { ...fieldToEdit };
    temp = {};
    setFieldToEdit(temp);
    setSelectedGlobalTag(temp);
    setCustomName("");
    setShowAddTagModal(false);
  };

  const deleteTag = async (tagID) => {
    console.log({ tagID });
    try {
      const deleteTagRequest = await deleteProtected("/accounting/tag", {
        tag_id: tagID,
      });

      if (deleteTagRequest.status) {
        showNotification("Tag removed", "Success");
      } else {
        showNotification(deleteTagRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const removeTag = async (index) => {
    var temp = [...newTags];
    delete temp[index];
    setNewTags(temp);
    temp = [...tagCounter];
    temp = temp.filter((item, ind) => ind !== index);
    setTagCounter(temp);
  };

  const toggleFetchFields = () => {
    if (fetchFields){
      setFetchFields(false)
    } else {
      setFetchFields(true)
    }
  }

  const deleteCustomField = async () => {
    try {
      const deleteCustomFieldRequest = await deleteProtected(
        "/accounting/custom/field",
        {
          custom_field_id: fieldToDelete,
        }
      );

      if (deleteCustomFieldRequest.status){
        showNotification("Custom field deleted", "Success")
        setShowDeleteField(false)
        toggleFetchFields()
      } else {
        showNotification(deleteCustomFieldRequest.message, "Error")
      }
    } catch (error) {
      showNotification(error.message,"Error")
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

      {showDeleteCategory && (
        <Modal>
          <DeleteItem
            header="Delete Category"
            body="You are about to delete a category. This cannot be reversed. Continue?"
            closeModal={() => closeDeleteModal()}
          />
        </Modal>
      )}

      {showAddTagModal && (
        <Modal>
          <div className="addCustomTagModal">
            <header className="displayFlex flexAlignCenter flexJustifyBetween">
              <label className="font14 oxfordText">New Rule</label>
              <img
                alt="close modal"
                className="cursorPointer"
                src={closeIcon}
                onClick={() => closeAddTagsModal()}
              />
            </header>
            <hr />

            <div className="body">
              <p className="title font12 oxfordText">Select tag type</p>
              {Object.entries(fieldToEdit).length === 0 && (
                <DropDown
                  label="Tag Type"
                  data={globalTags}
                  onSelect={(index) => {
                    var temp = { ...selectedGlobalTag };
                    temp = globalTags[index];
                    setSelectedGlobalTag(temp);
                    temp = { ...selectedCustomField };
                    temp = customFields[index];
                    setSelectedCustomField(temp);
                  }}
                />
              )}

              {Object.entries(fieldToEdit).length !== 0 && (
                <FormInput
                  defaultValue={capitalize(fieldToEdit.name)}
                  disabled={true}
                  label="Field Name"
                />
              )}

              {(Object.entries(selectedGlobalTag).length > 0 ||
                Object.entries(fieldToEdit).length !== 0) && (
                <React.Fragment>
                  <div>
                    {selectedGlobalTag === "Custom" && (
                      <React.Fragment>
                        <p className="mt24 font12 oxfordText">Custom Name</p>
                        <form
                          onChange={(event) =>
                            setCustomName(event.target.value)
                          }
                        >
                          <FormInput label="Tag Name" />
                        </form>
                      </React.Fragment>
                    )}

                    <div className="mb16">
                      {tagCounter.map((item, index) => (
                        <ActionInput
                          label="Item Name"
                          defaultValue={
                            newTags[index] ? newTags[index].name : ""
                          }
                          action={() => {
                            console.log(newTags[index]);
                            if (newTags[index] && newTags[index]?.id) {
                              deleteTag(newTags[index].id);
                            } else {
                              removeTag(index);
                            }
                          }}
                          onChange={(value) => {
                            const temp = [...newTags];
                            temp[index] = value;
                            setNewTags(temp);
                          }}
                        />
                      ))}
                    </div>

                    {Object.entries(fieldToEdit).length === 0 && (
                      <p
                        className="pt15 mb30 font14 cursorPointer blueLinkUnderlined"
                        onClick={() => {
                          const temp = [...tagCounter];
                          temp.push(1);
                          setTagCounter(temp);
                        }}
                      >
                        Add a new tag item
                      </p>
                    )}
                  </div>

                  <form onSubmit={(event) => validateData(event)}>
                    <div className="displayFlex flexJustifyEnd mt30">
                      {Object.entries(fieldToEdit).length === 0 && (
                        <Button
                          label={
                            Object.entries(fieldToEdit).length !== 0
                              ? "Save"
                              : "Create"
                          }
                        />
                      )}
                    </div>
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </Modal>
      )}

      {showDeleteField && (
        <Modal>
          <DeleteItem
            header="Delete Custom Field"
            body="You are about to delete a custom field. Continue?"
            confirm={() => deleteCustomField()}
            closeModal={() => {
              setFieldToDelete("")
              setShowDeleteField(false)
            }}
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

      <h1 className="mt20 oxfordText font20 weight500 mb20">Accounting</h1>

      <div className="settingsContent">
        <div className="displayFlex topNav">
          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "transactions" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("transactions");
            }}
          >
            <p className="font13">Transactions</p>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "setup" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("setup");
            }}
          >
            <div className="displayFlex">
              <p className="font13">Setup</p>
              <img />
            </div>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "categories" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("categories");
            }}
          >
            <p className="font13">Categories</p>
            <div className="indicator"></div>
          </div>

          <div
            className={`mr30 cursorPointer topNavItem ${
              activeTab === "custom tags" ? "active" : "passive"
            }`}
            onClick={() => {
              setActiveTab("custom tags");
            }}
          >
            <p className="font13">Custom Tags</p>
            <div className="indicator"></div>
          </div>
        </div>
        <hr className="topDivider" />

        {activeTab === "categories" && (
          <Categories
            showNotification={(message, type) =>
              showNotification(message, type)
            }
            showDelete={(categoryID) => {
              setCategoryToDelete(categoryID);
              setShowDeleteCategory(true);
            }}
          />
        )}

        {activeTab === "custom tags" && (
          <CustomTags
          fetchFields={fetchFields}
            showNotification={(message, type) =>
              showNotification(message, type)
            }
            showAddTagModal={() => {
              setShowAddTagModal(true);
            }}
            showNotification={(message, type) =>
              showNotification(message, type)
            }
            deleteField={(field_id) => {
              console.log(field_id);
              setFieldToDelete(field_id);
              setShowDeleteField(true);
            }}
            editField={(field) => {
              var temp = { ...fieldToEdit };
              temp = field;
              setFieldToEdit(temp);
              temp = [...tagCounter];
              temp = [];
              var tempNewTags = [...newTags];
              tempNewTags = [];
              field.tags.forEach((item) => {
                temp.push(1);
                tempNewTags.push(item);
              });
              setTagCounter(temp);
              setNewTags(tempNewTags);
              setShowAddTagModal(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Accounting;
