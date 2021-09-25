import searchIcon from "../../../Assets/img/searchIcon.svg"
import Accordion from "../../../Components/Accordion/accordion"
import FormInput from "../../../Components/FormInput/formInput"
import NumberInput from "../../../Components/FormInput/numberInput"
import plainAlertIcon from "../../../Assets/img/icons/plainAlertIcon.svg"
import Button from "../../../Components/Button/button"
import { useState } from "react"
import Modal from "../../../Components/Modal/modal"
import BorderedArea from "../../../Components/BorderedArea/borderedArea"
import closeIcon from "../../../Assets/img/closeIcon.svg"
import DropDown from "../../../Components/DropDown/dropDown"


const Profile = () => {
    const [hasAccount, setHasAccount] = useState(false)
    return (
        
        <div className="profile pr30">
            <Modal>
                <BorderedArea>
                    <header>
                        <p className="font14 oxfordText">Add Vendor Bank Account</p>
                        <img alt="close" src={closeIcon} />
                    </header>

                    <hr />

                    <div className="pl20 pb20 pr20">
                        <div className="displayFlex flexJustifyBetween top">
                            <DropDown label="BANK" data={[]} />
                            <NumberInput label="ACCOUNT NUMBER" placeholder="e.g 1230" />
                        </div>

                        <FormInput label="ACCOUNT NAME" />
                    </div>
                </BorderedArea>
            </Modal>
            <nav>
                <div className="navLeft">
                    <img alt="searchIcon" src={searchIcon} />
                    <input placeholder="Search Expense, Members, Reimbbursments etc." type="text" />
                </div>
            </nav>

            <p className="font20 oxfordText weight600 mt15">My Profile</p>

            <div className="user mt20 flexAlignCenter">
                <div className="userAvatar">
                    <div className="placeholder"></div>
                </div>

                <div className="userDetails pl20">
                    <p className="font16 oxfordText weight500">Ade Doe</p>
                    <p className="font14 oxfordText mt5">ade.doe@elephantco.com</p>
                </div>
            </div>

            <div className="mt20">
                <Accordion status={true}>
                    <div className="p20">
                        <form>
                            <div className="displayFlex fullWidth">
                                <FormInput label="FIRST NAME" type="email" />
                                <FormInput label="LAST NAME" type="email" />
                            </div>

                            <div className="displayFlex fullWidth">
                                <FormInput label="WORK EMAIL" type="email" />
                                <NumberInput label="PHONE NUMBER" />
                            </div>
                        </form>
                    </div>
                </Accordion>
            </div>

            <div className="security mt20">
                <Accordion status={false}>
                    <div className="p20">
                        <span className="displayFlex flexAlignCenter">
                            <img alt="alert" src={plainAlertIcon} />
                            <p className="font13 oxfordText ml10">To reset your password, click the button below and a reset link will be sent to your account email address.</p>
                        </span>
                        <FormInput label="PASSWORD" type="password" side="reset" />
                    </div>
                </Accordion>
            </div>

            <div className="mt20">
                <Accordion status={false}>
                    <div className="p20">
                        <span className="displayFlex flexAlignCenter mb20">
                            <img alt="alert" src={plainAlertIcon} />
                            <p className="font13 oxfordText ml10">{hasAccount ? "An overview of your reimbursement account. For security reasons, you should contact your Account owner to change it safely." : "Add your bank account information in order to receive reimbursement on time and seamlessly by your employer."}</p>
                        </span>

                        {
                            !hasAccount && <div>
                            <Button label="Add a bank account" />
                            </div>
                        }

                        {
                            hasAccount && <div className="bankDetails">
                            <div className="displayFlex">
                                <FormInput label="BANK" type="text"  />
                                <NumberInput label="ACCOUNT NUMBER" />
                            </div>

                            <FormInput label="ACCOUNT NAME" type="text"  />
                        </div>
                        }

                        

                    </div>
                </Accordion>
            </div>
        </div>
    )
}

export default Profile