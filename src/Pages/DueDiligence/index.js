import { Route, useLocation } from "react-router"
import DueDiligence from "./dueDiligence"
import SetUpCompany from "./setUpCompany"
import DueDiligenceSuccess from "./successPage"
import UploadCompanyDocuments from "./uploadCompanyDocuments"

const DueDiligenceIndex = () => {

    return (
        <div>
            <Route path="/due-diligence" component={DueDiligence} exact />
            <Route path="/due-diligence/success" component={DueDiligenceSuccess} exact />
            <Route path="/due-diligence/set-up-company" component={SetUpCompany} />
            <Route path="/due-diligence/upload-company-documents" component={UploadCompanyDocuments} />
        </div>
    )
}

export default DueDiligenceIndex