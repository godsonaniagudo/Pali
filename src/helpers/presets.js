import accountingIcon from "../Assets/img/icons/accountingIcon.svg"
import billsIcon from "../Assets/img/icons/billsIcon.svg"
import homeIcon from "../Assets/img/icons/homeIcon.svg"
import moneyIcon from "../Assets/img/icons/moneyIcon.svg"
import peopleIcon from "../Assets/img/icons/peopleIcon.svg"
import requestsIcon from "../Assets/img/icons/requestsIcon.svg"
import settingsIcon from "../Assets/img/icons/settingsIcon.svg"
import vendorsIcon from "../Assets/img/icons/vendorsIcon.svg"

export const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Katsina",
    "Kano",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
]

export const categories = [
    "Agriculture",
    "Digital Services",
    "Education",
    "Financial Services",
    "General Services",
    "Health",
    "Hospitality and Tourism",
    "Manufacturing",
    "Membership Groups",
    "NGO",
    "Media",
    "Religious Organisations",
    "Technology",
    "Travel and Hospitality",
    "Utilities"
]

export const authenticatedMenu = [{
        name: "Home",
        path: "/",
        icon: homeIcon
    },
    {
        name: "Claims",
        path: "/claims",
        icon: moneyIcon
    },
    {
        name: "Bills",
        path: "/bills",
        icon: billsIcon
    },
    {
        name: "Requests",
        path: "/requests",
        icon: requestsIcon
    },
    {
        name: "Accounting",
        path: "/accounting",
        icon: accountingIcon
    },
    {
        name: "People",
        path: "/people",
        icon: peopleIcon
    },
    {
        name: "Vendors",
        path: "/vendors",
        icon: vendorsIcon
    },

]