import { useEffect, useState } from "react"
import Accordion from "../../../../Components/Accordion/accordion"
import FormInput from "../../../../Components/FormInput/formInput"
import getProtected from "../../../../helpers/requests/getProtected"

const Info = () => {
  const [company, setCompany] = useState({})

  useEffect(() => {
    fetchCompany()
  }, [])

  const fetchCompany = async () => {
    try {
      const fetchCompanyRequest = await getProtected("/company")

      if (fetchCompanyRequest.status){
        var temp = {...company}
        temp = fetchCompanyRequest.data
        setCompany(temp)
      } else {

      }
    } catch (error) {
      
    }
  }


    return (
        <div>
            <Accordion status={true} label="Business Details">
          <div>
            <div className="displayFlex nameCategory">
              <FormInput label="LEGAL NAME" disabled={true} defaultValue={company?.company?.registered_name} />
              <FormInput label="BUSINESS CATEGORY" disabled={true} />
            </div>

            <div className="siteDescription">
              <FormInput label="WEBSITE" disabled={true} defaultValue={company?.company?.website} />
              <FormInput label="DESCRIPTION" disabled={true} defaultValue={company?.company?.description} />
            </div>
          </div>
        </Accordion>

        <Accordion label="Address">
          <div className="address">
            <div className="operatingAddress">
              <FormInput label="OPERATING ADDRESS" disabled={true} defaultValue={company?.company?.office_address?.address} />
            </div>

            <div className="location">
              <FormInput label="CITY" disabled={true} defaultValue={company?.company?.office_address?.city}  />
              <FormInput label="STATE" disabled={true} defaultValue={company?.company?.office_address?.state} />
              <FormInput label="COUNTRY" disabled={true} defaultValue={company?.company?.office_address?.country} />
            </div>
          </div>
        </Accordion>
        </div>
    )
}

export default Info