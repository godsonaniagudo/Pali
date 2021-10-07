import { useEffect, useRef, useState } from "react";
import optionsIcon from "../../../../Assets/img/icons/optionsIcon.svg";
import categoryIcon from "../../../../Assets/img/icons/categoryIcon.svg";
import addIcon from "../../../../Assets/img/icons/addIcon.svg";
import getProtected from "../../../../helpers/requests/getProtected";
import "./../styles/styles.css";
import patchProtected from "../../../../helpers/requests/patchProtected";
import { validateCategoryString } from "../../../../helpers/validators";
import postProtected from "../../../../helpers/requests/postProtected";

const CategoryItem = ({ category, showNotification, showDelete }) => {
  const [showOption, setShowOption] = useState(false);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    setStatus(category.status);
  }, []);

  const optionRef = useRef(null);
  const toggleShowOption = () => {
    if (!showOption) {
      setShowOption(true);
    }
  };


  const toggleStatus = async () => {
      setShowOption(false)
    try {
      if (status === "active") {
          const disableCategoryRequest = await patchProtected(
            "/accounting/category/disable",
            { category_id: category.id }
          );

          console.log({ disableCategoryRequest });

          if (disableCategoryRequest.status){
            showNotification("Category disabled successfully", "Success")
            setStatus("inactive")
          } else {
              showNotification(disableCategoryRequest.message, "Error");
          }
      } else {
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowOption(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(optionRef);


  return (
    <div className="categoryItem displayFlex flexJustifyBetween">
      <div className="displayFlex flexAlignCenter">
        <img src={categoryIcon} className="icon" />
        <p className="font14 oxfordText">{category.name}</p>
      </div>

      <div className="options">
        {showOption && (
          <div
            ref={optionRef}
            className="font13 oxfordText"
            onClick={() => toggleStatus()}
          >
            {status === "active" ? "Disable" : "Enable"}
          </div>
        )}
        <img
          src={optionsIcon}
          className="drop"
          onClick={() => toggleShowOption()}
        />
        {/* <img src={deleteIcon} className="delete" onClick={() => showDelete(category.id)} /> */}
      </div>
    </div>
  );
};

const Categories = ({ showNotification, showDelete }) => {
  const [categories, setCategories] = useState([]);
  const customFieldRef = useRef(null);
  const [addingCategory, setAddingCategory] = useState(false)

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const getCategoriesRequest = await getProtected("/accounting/categories");

      if (getCategoriesRequest.status) {
        var temp = [...categories];
        temp = getCategoriesRequest.data;
        setCategories(temp);
      } else {
        showNotification(getCategoriesRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target[0].value === "") {
      showNotification("Enter a name for your custom category", "Error");
    } else if (!validateCategoryString(event.target[0].value)) {
      showNotification(
        "Category names can only include letters and the & character",
        "Error"
      );
    } else {
      saveNewCategory(event.target[0].value);
    }
  };

  const saveNewCategory = async (categoryName) => {
      setAddingCategory(true)
    try {
      const saveNewCategoryRequest = await postProtected(
        "/accounting/category/custom",
        { category_name: categoryName }
      );

      setAddingCategory(false);

      if (saveNewCategoryRequest.status) {
        showNotification("Added custom category", "Success");
        customFieldRef.current.value = "";
        getCategories();
      } else {
        showNotification(saveNewCategoryRequest.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  return (
    <div className="categories">
      <p className="font10 greyText1 weight300">Pali category</p>

      <div>
        {categories.map((item, index) => (
          <CategoryItem
            key={index}
            category={item}
            showDelete={(categoryID) => showDelete(categoryID)}
            showNotification={(message, type) =>
              showNotification(message, type)
            }
          />
        ))}

        <div className="categoryItem">
          <div className="displayFlex flexAlignCenter">
            <img alt="add category" src={addIcon} className="addIcon" />
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
              disabled={addingCategory}
                placeholder="Add custom category..."
                ref={customFieldRef}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
