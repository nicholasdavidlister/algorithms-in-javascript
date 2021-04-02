function count(arr) {
    let total = 0
    let i = 0
    while (i < arr.length) {
        if (arr[i] !== undefined) {
            total++
        }
        i++
    }
    return total
}