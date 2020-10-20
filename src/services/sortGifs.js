export default function sortGifs({ gifs, numCols }) {
    let result = Array(numCols).fill([])
    let counter = 0

    for (let i = 0; i < gifs.length; i++) {
        result[counter] = result[counter].concat([gifs[i]])
        if (counter === (result.length - 1)) {
            counter = 0
        } else {
            counter++
        }
    }

    return result
}