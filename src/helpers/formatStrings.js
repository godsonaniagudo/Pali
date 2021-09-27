export const getInitials = (name) => {
    var splitName = name.split(" ")
    splitName = splitName.slice(0,2)
    var initials = ""
    
    if (splitName.length === 1){
        initials = splitName[0].slice(0,1).toUpperCase()
    } else {
        initials = splitName[0].slice(0,1).toUpperCase() + splitName[1].slice(0,1).toUpperCase()
    }

    return initials

}

export const capitalize = (text) => {
    return String(text).slice(0,1).toLocaleUpperCase() + String(text).slice(1)
}

export const plainText = (text) => {
    return String(text).replace("-", " ")
}