import { useEffect, useState } from "react"
import DropDown from "../../../../Components/DropDown/dropDown"
import FormInput from "../../../../Components/FormInput/formInput"
import getProtected from "../../../../helpers/requests/getProtected"

const Mileage = ({
        showNotification
    }) => {
    const [categories, setCategories] = useState([])
    const [categoryNames, setCategoryNames] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({})

    useEffect(() => {
        fetchCategories()
    }, [])

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
    return (
        <div className="mileage">
            <p className="font14 weight400">Set Mileage Rate</p>
            <p className="font12 secondaryColorText mt5">The multiplier that will be used to calculate employee submitted distance to the amount for reimbursement.</p>
            <div className="pb24">
                < FormInput side = "rate"
                rate = "NGN/KM"
                label = "MILEAGE RATE" / >
            </div>
            <div>
                <hr />
            </div>

            <p className="font14 weight400">Set Default Mileage Category</p>
            <p className="font12 secondaryColorText mt5">The multiplier that will be used to convert employee submitted mileage to the amount for reimbursement.</p>
            <DropDown label="DEFAULT CATEGORY" data={categoryNames} onSelect={index => {
                setDefaultCategory(index)
            }} />

            <hr />

            <p className="font14 weight400">Settlement</p>
            <p className="font12 secondaryColorText mt5">Settlement users will be the only Users who can settle/pay for Approved Claims.</p>
            <DropDown label="SELECT USERS" data={[]} onSelect={index => setDefaultCategory(index)} />
        </div>
    )
}

export default Mileage