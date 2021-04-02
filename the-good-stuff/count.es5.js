function count(arr) {
    var total = 0
    var i = 0
    while (i < arr.length) {
        if (arr[i] !== undefined) {
            total++
        }
        i++
    }
    return total
}