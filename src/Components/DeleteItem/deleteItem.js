import alertIcon from "../../Assets/img/icons/alertIcon.svg";
import close from "../../Assets/img/closeIcon.svg";
import Button from "../Button/button";
import "./styles/styles.css";

const DeleteItem = ({ header, body, closeModal, confirm }) => {
  return (
    <div className="deleteModal">
      <div className="deleteHeader displayFlex flexJustifyEnd">
        <img alt="close" src={close} className="close" onClick={() => {closeModal()}} />
      </div>
      <div className="displayFlex flexJustifyCenter">
        <img alt="alert" src={alertIcon} className="close" />
      </div>
      <p className="oxfordText font16 mt20 weight600 textCenter">{header}</p>
      <p className="charcoalText font14 mt20 mb20 textCenter">{body}</p>
      <div className="displayFlex flexJustifyCenter">
        <Button label="Delete" onClick={() => {confirm()}} />
      </div>
    </div>
  );
};

export default DeleteItem;
