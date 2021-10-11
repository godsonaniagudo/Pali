import { useEffect, useState } from "react"
import DropDown from "../../../../Components/DropDown/dropDown"
import FormInput from "../../../../Components/FormInput/formInput"
import NumberInput from "../../../../Components/FormInput/numberInput"
import { capitalize } from "../../../../helpers/formatStrings"
import getProtected from "../../../../helpers/requests/getProtected"
import patchProtected from "../../../../helpers/requests/patchProtected"
import postProtected from "../../../../helpers/requests/postProtected"

const Mileage = ({
        showNotification
    }) => {
    const [categories, setCategories] = useState([])
    const [categoryNames, setCategoryNames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({})
    const [mileageSettings, setMileageSettings] = useState({})

    useEffect(() => {
        fetchCategories()
        fetchMileageSettings()
    }, [])



    const fetchMileageSettings = async () => {
        try {
            const fetchMileageSettingsRequest = await getProtected("/expense/settings")

            if (fetchMileageSettingsRequest.status) {
                var temp = {...mileageSettings}
                temp = fetchMileageSettingsRequest.data
                setMileageSettings(temp)
            } else {
                showNotification(fetchMileageSettingsRequest.message, "Error")
            }
        } catch (error) {
            showNotification(error.message, "Error")
        }
    }

    const setDefaultCategory = async (index) => {
        try {
            console.log(index);
        } catch (error) {
            showNotification(error.message, "Error")
        }
    }


    const fetchCategories = async () => {
        try {
             const fetchCategoriesRequest = await getProtected("/accounting/categories")

             if (fetchCategoriesRequest.status){
                var temp = [...categoryNames]
                temp = fetchCategoriesRequest.data.map(item => item.name)
                setCategoryNames(temp)
                temp = [...categories]
                temp = fetchCategoriesRequest.data
                setCategories(temp)
             } else {
                 showNotification(fetchCategoriesRequest.message, "Error")
             }
        } catch (error) {
            showNotification(error.message, "Error")
        }
    } 


    const setMileageRate = async (payload) => {
        console.log(payload);
        try {
            const setMileageRateRequest = await postProtected("/expense/settings", payload)

            if (setMileageRateRequest.status){
                showNotification("Succesfully set mileage rate", "Success")
            } else {
                showNotification(setMileageRateRequest.message, "Error")
            }
        } catch (error) {
            showNotification(error.message, "Error")
        }
    }

    const updateMileageRate = async (payload, type) => {
        try {
            setTimeout(async () => {
                const setMileageRateRequest = await patchProtected("/expense/settings", payload)

                if (setMileageRateRequest.status) {
                    if (type === "category"){
                        showNotification("Succesfully set default category", "Success")
                    } else {
                        showNotification("Succesfully set mileage rate", "Success")
                    }
                    
                } else {
                    showNotification(setMileageRateRequest.message, "Error")
                }
            }, 1500)
        } catch (error) {
            showNotification(error.message, "Error")
        }
    }

    if (Object.entries(mileageSettings).length === 0){
        return <div></div>
    }

    return (
        <div className="mileage">
            <p className="font14 weight400">Set Mileage Rate</p>
            <p className="font12 secondaryColorText mt5">The multiplier that will be used to calculate employee submitted distance to the amount for reimbursement.</p>
            <div className="pb24">
                <form onChange={(event) => {
                    if (mileageSettings?.id){
                        updateMileageRate({
                            category_id: mileageSettings?.category?.id,
                            mileage_rate: Number(event.target.value),
                            id: mileageSettings.id
                    }, "rate")
                } else {
                    setMileageRate({
                        mileage_rate: Number(event.target.value)
                    })
                }
                }}>
                    <NumberInput side = "rate"
                    defaultValue={mileageSettings?.rate ? Number(mileageSettings.rate) : Number(0)}
                    side = "NGN/KM"
                    label = "MILEAGE RATE" / >
                </form>
            </div>
            <div>
                <hr />
            </div>

            <p className="font14 weight400">Set Default Mileage Category</p>
            <p className="font12 secondaryColorText mt5">The multiplier that will be used to convert employee submitted mileage to the amount for reimbursement.</p>
            <DropDown label = "DEFAULT CATEGORY"
            data = {
                categoryNames
            }
            defaultValue = {
                mileageSettings?.category?.name
            }
            onSelect = {
                    index => {

                if (mileageSettings?.id){
                    updateMileageRate({
                        category_id: categories[index].id,
                        mileage_rate: mileageSettings.rate,
                        id: mileageSettings.id
                    }, "category")
                } else {
                    setMileageRate({
                        category_id: categories[index].id
                    })
                }

                
            }} />

            <hr />

            <p className="font14 weight400">Settlement</p>
            <p className="font12 secondaryColorText mt5">Settlement users will be the only Users who can settle/pay for Approved Claims.</p>
            <DropDown label="SELECT USERS" data={[]} onSelect={index => setDefaultCategory(index)} />
        </div>
    )
}

export default Mileage