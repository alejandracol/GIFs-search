const apiKey = "yvCGH2hIKTuKxgfIH17EdZnOOCKhbpvw"

const responseCodes = {
    400: "Your request was formatted incorrectly or missing a required parameter(s).",
    403: "You weren't authorized to make your request; most likely this indicates an issue with your API Key.",
    404: "The particular GIF or Sticker you are requesting was not found. This occurs, for example, if you request a GIF by using an id that does not exist.",
    429: "Your API Key is making too many requests. Read about requesting a Production Key to upgrade your API Key rate limits."
}

function requestGifs({ currKeyword, offset, numGifs }) {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${currKeyword}&limit=${numGifs}&offset=${offset}&rating=g&lang=en`

    return fetch(apiUrl)
        .then(res => res.json())
        .then(response => {
            let dataGifs
            const { data, meta: { status: code } } = response
            if (code !== 200) {
                dataGifs = { code, message: responseCodes[code] }
            }
            else if (data.length === 0)
                dataGifs = { code: "200*", message: `Sorry, no GIFs found for: ${currKeyword}`}
            else {
                dataGifs = data.map(gif => {
                    const { id, title, images: { original: { height: originalHeight, width: originalWidth, url } } } = gif
                    const path = "/gifs/" + title.split(' ').slice(0, title.split(' ').indexOf('GIF')).concat(id).join("-")
                    return { id, title, originalHeight, originalWidth, url, path }
                })
            }
            return dataGifs
        })
}

function requestGifsById(id) {
    const apiUrl = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`

    return fetch(apiUrl)
        .then(res => res.json())
        .then(response => {
            let dataGifs
            const { data, meta: { status: code } } = response
            if (code !== 200) {
                dataGifs = { code, message: responseCodes[code] }
            }
            else {
                const { username, source, source_tld, title, images: { original: { url }}} = data
                const path = "/gifs/" + title.split(' ').slice(0, title.split(' ').indexOf('GIF')).concat(id).join("-")
                dataGifs = { username, source, source_tld, title, url, path }
            }
            return dataGifs
        })
}

export { requestGifs, requestGifsById }



	


   
