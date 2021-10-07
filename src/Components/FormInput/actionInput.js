import { useEffect, useState } from "react";
import "../FormInput/styles/styles.css";
import closeIcon from "../../Assets/img/closeIcon.svg";

const ActionInput = ({
  label,
  side,
  type,
  hideLabel,
  placeholder,
  onChange,
  max,
  defaultValue,
  action
}) => {
  const [sideLabel, setSideLabel] = useState("show");
  const [inputType, setInputType] = useState("text");
  console.log(max);
  useEffect(() => {
    setInputType(type);
  }, []);

  const handleSideClick = () => {
    if (sideLabel === "show") {
      setSideLabel("hide");
    } else {
      setSideLabel("show");
    }
  };

  return (
    <div className="formInput">
      {!hideLabel && <label>{label}</label>}

      <div className="formInputContainer">
        <input
          placeholder={placeholder}
          type={
            inputType === "password"
              ? sideLabel === "hide"
                ? "text"
                : "password"
              : inputType
          }
          defaultValue={defaultValue ? defaultValue : ""}
          onChange={(event) => (onChange ? onChange(event.target.value) : {})}
        />

        <img
        className="pr20 cursorPointer"
          alt="action"
          src={closeIcon}
          onClick={() => {
            if (action){
              action();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ActionInput;
