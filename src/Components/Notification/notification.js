import closeIcon from "../../Assets/img/closeIcon.svg";
import "./styles/styles.css";

const Notification = ({ text, type, close }) => {
  const getShade = () => {
    switch (type) {
      case "Success":
        return "success";
      case "Error":
        return "error";
      case "Notice":
        return "notice";
      case "Warning":
        return "warning";
      default:
    }
  };

  return (
    <div className="notification">
      <div className="notificationBody">
        <p className="font14 oxfordText"> {text} </p> <img alt="close" src={closeIcon} onClick={() => close()} />{" "}
      </div>{" "}
      <div className={`notificationShade ${getShade()}`}></div>{" "}
    </div>
  );
};

export default Notification;
