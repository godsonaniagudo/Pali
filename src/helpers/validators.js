const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const numberRegex = /[0-9+]{11,14}/
const stringRegex = /([A-Za-z&])/

export const validateEmail = (email) => {
    return emailRegex.test(email)
}

export const validatePassword = (password) => {
    return passwordRegex.test(password)
}

export const validatePhoneNumber = (number) => {
    return numberRegex.test(number)
}

export const validateCategoryString = (string) => {
    return stringRegex.test(string)
}