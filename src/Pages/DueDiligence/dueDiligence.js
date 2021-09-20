import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"

const DueDiligence = () => {
    return (
        <div className="dueDiligence">
            <img alt="logo" src={logo} className="logo" />
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Welcome to Pali</p>
                    <p className="charcoalText font14 mt10">We’ll need some info and documents to verify your business. We understand that it can be convenient at times, however, it’s a requirement to keep you and our customers safe.</p>

                    <p className="mt30 font14 oxfordText weight500">PALI LABS LIMITED</p>
                    <p className="font14 mt5 oxfordText"> Plot 1980, Hakeem Agboola Crescent, Ajao Estate, Lagos, Nigera</p>
                    <p className="mt5 oxfordText font14">RC 03600013</p>
                </div>



                <div className="buttonContainer">
                    <Button label="Continue" />
                </div>
            </div>
        </div>
    )
}

export default DueDiligence