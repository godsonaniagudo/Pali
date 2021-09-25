const getProtected = async (path) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token

    try {
        const request = await fetch("https://getpali.com/v1" + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                // "Access-Control-Allow-Origin": "*"
            },
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }


}

export default getProtected