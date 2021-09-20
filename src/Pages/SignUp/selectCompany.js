import Button from "../../Components/Button/button"
import FormInput from "../../Components/FormInput/formInput"
import logo from "../../Assets/img/logoPlain.svg"
import companyLogo from "../../Assets/img/companyIcon.svg"
import "./styles/styles.css"
import { useState } from "react"

const SelectCompany = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName : "Paribus Limited",
        companyAddress: "Unit 20 , William James House, Cowley Road, CB4 0WX Cambridge",
        companyRegNo: "RC 03600013"
    })

    return (
        <div className="selectCompany">
            <img alt="logo" src={logo} />
            <div className="content">
                <div>
                    <p className="oxfordText font20 headerText weight500">Find your company</p>
                    <p className="charcoalText font14">You can search by company name or registration number</p>
                </div>

                <FormInput
                    label="Company"
                    type="text"
                />

                <div className="companyDetails oxfordText">
                    <img alt="companyLogo" src={companyLogo} />
                    <div>
                        <p className="weight500 font14">{companyDetails.companyName.toLocaleUpperCase()}</p>
                        <p className="font14">{companyDetails.companyAddress}</p>
                        <p className="font14">{companyDetails.companyRegNo}</p>
                    </div>
                </div>

                <div className="terms">
                    <input type="checkbox" />
                    <p className="oxfordText font14">I have read and accept the Terms of Service, Terms of Service and Privacy Policy</p>
                </div>

                <div className="buttonContainer">
                    <Button label="Continue" />
                </div>
            </div>
        </div>
    )
}

export default SelectCompany