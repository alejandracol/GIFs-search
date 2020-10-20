export default function defineWidthGifs(viewportWidth, numCols) {
    if (viewportWidth > 1250) return 1250 / numCols - 13
    else return viewportWidth / numCols - 13
}