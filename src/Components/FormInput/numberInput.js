import { useEffect, useRef, useState } from "react";
import "../FormInput/styles/styles.css";

const NumberInput = ({
  label,
  side,
  type,
  hideLabel,
  placeholder,
  onChange,
  max,
  defaultValue,
  disabled
}) => {
  const [sideLabel, setSideLabel] = useState("show");
    const [number, setNumber] = useState("")
  const [inputType, setInputType] = useState("text");
  const inputRef = useRef(null)

  useEffect(() => {
    setInputType(type);
    if (defaultValue){
      inputRef.current.value = defaultValue
    }

  }, []);

  const handleSideClick = () => {
    if (sideLabel === "show") {
      setSideLabel("hide");
    } else {
      setSideLabel("show");
    }
  };

  return (
    < div className = {
      `formInput ${disabled === true ? `disabled` : `enabled`}`
    } >
      {!hideLabel && <label>{label}</label>}

      <div className="formInputContainer">
        <input
          placeholder={placeholder}
          type="number"
          ref={inputRef}
          disabled={disabled}
          defaultValue={defaultValue}
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
          >
            {side}
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
