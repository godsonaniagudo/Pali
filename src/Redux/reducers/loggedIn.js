const loggedIn = (state = false, action) => {
    switch (action.type) {
        case "LOGGED IN":
            console.log("logged iiin");
            return true;
        case "LOGGED OUT":
            return false;
        default:
            return state
    }
}

export default loggedIn