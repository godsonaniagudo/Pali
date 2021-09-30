import Accordion from "../../../../Components/Accordion/accordion"
import FormInput from "../../../../Components/FormInput/formInput"

const Info = () => {
    return (
        <div>
            <Accordion status={true} label="Business Details">
          <div>
            <div className="displayFlex nameCategory">
              <FormInput label="LEGAL NAME" />
              <FormInput label="BUSINESS CATEGORY" />
            </div>

            <div className="siteDescription">
              <FormInput label="WEBSITE" />
              <FormInput label="DESCRIPTION" />
            </div>
          </div>
        </Accordion>

        <Accordion label="Address">
          <div className="address">
            <div className="operatingAddress">
              <FormInput label="OPERATING ADDRESS" />
            </div>

            <div className="location">
              <FormInput label="CITY" />
              <FormInput label="STATE" />
              <FormInput label="COUNTRY" />
            </div>
          </div>
        </Accordion>
        </div>
    )
}

export default Info