export default function defineColsGifs(viewportWidth) {
    if (viewportWidth > 1000) return 5
    else if (viewportWidth > 800) return 4
    else if (viewportWidth > 600) return 3
    else if (viewportWidth > 400) return 2
    else return 1
}