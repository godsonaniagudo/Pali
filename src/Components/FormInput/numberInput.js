import { useEffect, useState } from "react";
import "../FormInput/styles/styles.css";

const NumberInput = ({
  label,
  side,
  type,
  hideLabel,
  placeholder,
  onChange,
  max,
}) => {
  const [sideLabel, setSideLabel] = useState("show");
    const [number, setNumber] = useState("")
  const [inputType, setInputType] = useState("text");

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
          type="number"
          value={number}
          onChange={(event) => {
              if (String(event.target.value).length <= max){
                  setNumber(event.target.value)
                  if (onChange) {
                      
                      return onChange(event.target.value)
                  }
              }
          }}
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

export default NumberInput;
