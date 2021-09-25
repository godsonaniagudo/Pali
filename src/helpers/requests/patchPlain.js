const patchPlain = async (path, data) => {
    try {
        const request = await fetch("https://getpali.com/v1" + path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
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

export default patchPlain