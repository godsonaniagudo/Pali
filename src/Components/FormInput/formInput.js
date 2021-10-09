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
  defaultValue,
  disabled,
  rate
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
    <div className={`formInput ${disabled ? `disabled`: `enabled`}`}>
      {!hideLabel && <label>{label}</label>}

      < div className = {
        `formInputContainer`
      } >
        <input
          placeholder={placeholder}
          disabled={disabled}
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

        {(type === "password" && side === "show") && (
          <span
            onClick={() => {
              handleSideClick();
            }}
          >
            {sideLabel}
          </span>
        )}

        {side === "rate" && (
          <span
          className="secondaryText"
          >
            {rate}
          </span>
        )}

        {(side !== undefined && side !== "show" && side !== "rate") && (
          <span
          className="linkText"
            onClick={() => {
              handleSideClick();
            }}
          >
            {side}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
