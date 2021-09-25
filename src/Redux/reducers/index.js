import { combineReducers } from "redux";
import loggedIn from "./loggedIn.js"

const allReducers = combineReducers({
    loggedIn
})

export default allReducers