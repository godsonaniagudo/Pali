import requestIcon from "../../Assets/img/icons/requestIcon.svg"
import "./styles/styles.css"

const IconButton = ({text}) => {
    return (
        <button className="iconButton">
            <img src={requestIcon} />
            {text}
        </button>
    )
}

export default IconButton