const getPlain = async (path) => {
    try {
        const request = await fetch("https://getpali.com/v1" + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*"
            },
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }


}

export default getPlain