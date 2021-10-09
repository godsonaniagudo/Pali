import { useEffect, useState } from "react";
import addIcon from "../../../../Assets/img/icons/addIcon.svg";
import getProtected from "../../../../helpers/requests/getProtected";
import optionsIcon from "../../../../Assets/img/icons/optionsIcon.svg"
import { capitalize } from "../../../../helpers/formatStrings";

const CustomFieldItem = ({data, editField, deleteField}) => {
    const [showContent, setShowContent] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const toggleShowContent = () => {
        if (showContent){
            setShowContent(false)
        } else {
            setShowContent(true)
        }
    }

    const toggleShowMenu = () => {
      if (showMenu) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };


    return (
      <div className="customFieldsItem">
        <header className="displayFlex flexJustifyBetween">
          <p onClick={() => toggleShowContent()}>{capitalize(data.name)}</p>
          <div className="optionsContainer">
            <img alt="options" src={optionsIcon} onClick={() => toggleShowMenu()}  />
            {
                showMenu && <div className="options">
              <label className="font13 oxfordText cursorPointer" onClick={() => {
                  editField();
                  toggleShowMenu()
              }}>Add New Tag</label>
              {/* <label className="font13 oxfordText cursorPointer">Add New Tag Item</label> */}
              <label className="font13 oxfordText cursorPointer" onClick={() => {
                  deleteField()
                  toggleShowMenu();
              }}>Delete</label>
            </div>
            }
          </div>
        </header>

        {showContent && (
          <div className="body">
            <hr />
            <div>
              {data.tags.map((item) => (
                <p className="font14 oxfordText">{item.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

const CustomTags = ({ showAddTagModal, editField, deleteField, fetchFields }) => {
  const [customFields, setCustomFields] = useState([]);
  useEffect(() => {
    getCustomFields();
  }, [fetchFields]);

  const getCustomFields = async () => {
    try {
      const getCustomFieldsRequest = await getProtected(
        "/accounting/custom/fields"
      );

      if (getCustomFieldsRequest.status) {
        var temp = [...customFields];
        temp = getCustomFieldsRequest.data;
        setCustomFields(temp);
      } else {
      }
    } catch (error) {}
  };

  return (
    <div className="customTags">
      <p className="bodyText font14 oxfordText mb24">
        Custom Tags are a set of fields that your team can add to an expense.
        They are a great way to further track and understand your expenses, stay
        organized and give you greater visibility of expenses. These tags will
        appear in your expense exports, which you can use for further analysis.
        Examples: Project, Event, Customer.
      </p>

      <div className="customFieldsContainer">
        {customFields.map((item, index) => (
          <CustomFieldItem
            data={item}
            editField={() => editField(item)}
            deleteField={() => deleteField(item.id)}
          />
        ))}
      </div>

      <div
        className="addTag displayFlex mt24 pl2f pt20 pb20"
        onClick={() => showAddTagModal()}
      >
        <img alt="add tag" src={addIcon} />
        <p className="font14 oxfordText">Add Custom Field</p>
      </div>
    </div>
  );
};

export default CustomTags;
