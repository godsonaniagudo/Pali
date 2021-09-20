import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import "./styles/styles.css"
import UploadArea from "../../Components/UploadArea/uploadArea"

const UploadCompanyDocuments = () => {
return (
        <div className="uploadCompanyDocuments">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font24 headerText weight500">Select the Owners of your company</p>
                    <p className="mt20 font14 charcoalText">All documents are handled with complete confidentiality and they are purely retained for legal compliance reasons.</p>
                </div>

                <UploadArea />

                <UploadArea />

                <UploadArea />


                <div className="buttonContainer">
                    <Button label="Submit" />
                </div>
            </div>
        </div>
    )
}

export default UploadCompanyDocuments