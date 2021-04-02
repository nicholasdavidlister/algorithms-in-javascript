function quicksort(arr){
    /*
        COULD PROBABLY SAVE OPERATIONS AND SPACE BY CONVERTING TO A LINKED LIST BEFORE WE BEGIN
        WOULD BENEFIT FROM BEING PASSED A COMPARISON FUNCTION RATHER THAN ASSUMING NUMBER VALUES
    */
    if (arr.length <= 1) return arr;
    if (arr.length == 2) {
        if (arr[0] > arr[1]){
            //swap the values
            let tmp = arr[0];
            arr[0] = arr[1];
            arr[1] = tmp;
        }      
        return arr;
    }
    if (arr.length > 2) {
        var pivot = arr.pop();
        var lte = [];
        var gt = [];
        var x = arr.pop()
        while (x){
            if( x <= pivot ) lte.push(x);
            else gt.push(x);
            x = arr.pop();
        }
        return quicksort(lte).concat(pivot, quicksort(gt))
    }
}

console.log(quicksort([]))
console.log(quicksort([1]))
console.log(quicksort([2,1]))
console.log(quicksort([3,2,1]))
var a = []
for (let i = 0; i < 50; i++){
    a.push( Math.floor(Math.random()*1000) - 500)
}
console.log(quicksort(a))