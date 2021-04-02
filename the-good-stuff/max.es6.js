function max(arr){
    var m = null;
    for (let el of arr) {
        if (m == null || el > m) m = el;
    }
    return m;
}