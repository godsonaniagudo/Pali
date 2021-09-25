const patchProtected = async (path, data) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        const request = await fetch("https://getpali.com/v1" + path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                // "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }


}

export default patchProtected