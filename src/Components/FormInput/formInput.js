import { useEffect, useState } from "react";
import "../FormInput/styles/styles.css";

const FormInput = ({
  label,
  side,
  type,
  hideLabel,
  placeholder,
  onChange,
  max,
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
          onChange={(event) => (onChange ? onChange(event.target.value) : {})}
        />
        {side && (
          <span
            onClick={() => {
              handleSideClick();
            }}
          >
            {sideLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
