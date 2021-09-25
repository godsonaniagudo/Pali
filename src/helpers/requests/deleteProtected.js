const deleteProtected = async (path, data) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    try {
        const request = await fetch("https://getpali.com/v1" + path, {
            method: "DELETE",
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

export default deleteProtected