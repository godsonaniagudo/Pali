import { useEffect, useState } from "react"
import Button from "../../../../Components/Button/button"
import DropDown from "../../../../Components/DropDown/dropDown"
import Modal from "../../../../Components/Modal/modal"
import getProtected from "../../../../helpers/requests/getProtected"

const Policy = ({showAdd}) => {
    const [selectedTab, setSelectedTab] = useState("claims")

    useEffect(() => {
        getPolicies()
    }, [])

    const getPolicies = async () => {
        try {
            const getPoliciesRequest = await getProtected("/policy")

            console.log(getPoliciesRequest);
        } catch (error) {
            console.log(error);
        }
    }


    return <div className="policy">

        <DropDown data={[]} hideLabel={true} placeholder="Default Policy" />

        <div className="tabs displayFlex">
            <div className={`cursorPointer tabItem ${selectedTab === "claims" ? "active" : "passive"}`} onClick={() => setSelectedTab("claims")}>
                <p className="tabTitle pr10 font13">Claims</p>
                <div className="tabIndicator"></div>
            </div>

            <div className={`cursorPointer tabItem ${selectedTab === "bills" ? "active" : "passive"}`} onClick={() => setSelectedTab("bills")}>
                <p className="tabTitle pr10 pl10 font13">Bills</p>
                <div className="tabIndicator"></div>
            </div>

            <div className={`cursorPointer tabItem ${selectedTab === "purchase order" ? "active" : "passive"}`} onClick={() => setSelectedTab("purchase order")}>
                <p className="tabTitle pr10 pl10 font13">Purchase Order</p>
                <div className="tabIndicator"></div>
            </div>
        </div>

        <hr />

        {
            selectedTab === "claims" && <div>
                <div className="mt20">
                    <Button label="Add Policy" onClick={() => {
                        showAdd()
                    }} />
                </div>
            </div>
        }
    </div>
}

export default Policy