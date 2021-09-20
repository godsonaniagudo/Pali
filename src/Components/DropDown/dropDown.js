import { useEffect, useRef, useState } from "react";
import "../DropDown/styles/styles.css";
import dropIcon from "../../Assets/img/dropIcon.svg";
import dropIconUp from "../../Assets/img/dropIconUp.svg";

const DropDown = ({ label, side, type, hideLabel, placeholder, data }) => {
  const [sideLabel, setSideLabel] = useState("hide");
  const [inputType, setInputType] = useState("text");
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState("")
  const dropDownRef = useRef(null)

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

  const handleDropDownClick = () => {
      if (selecting) {
          setSelecting(false)
      } else {
          setSelecting(true)
      }
  }

  const handleItemClick = (option) => {
      setSelected(option)
      setSelecting(false)
  }

  useEffect(() => {
      if (data.length > 1){
        setSelected(formatText(data[0]));
      } else {
          setSelected("")
      }
  }, [])

  const formatText = text => {
      return `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelecting(false)
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

  useOutsideAlerter(dropDownRef)

  return (
    <div className="dropDown">
      {!hideLabel && <label>{label}</label>}

      <div className="dropDownContainer" onClick={() => {handleDropDownClick()}}>
        <p className="font14">{selected}</p>
        <img alt="drop icon" src={selecting ? dropIconUp : dropIcon} />
      </div>
      <div className="listContainer" ref={dropDownRef}>
        {selecting && (
          <ul>
            {data.map((item, index) => (
              <li key={index} className="font14 oxfordText" onClick={() => handleItemClick(formatText(item))}>{formatText(item)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
