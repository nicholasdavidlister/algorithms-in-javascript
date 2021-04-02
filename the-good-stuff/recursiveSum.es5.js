function sum(arr){
    /*
    This is a recursive function to find the sum of an array of numbers.
    For more about recursive functions see https://introcs.cs.princeton.edu/java/23recursion/
    */
    //ADD SOME INPUT VALIDATION PLEASE
    //RECURSIVE CASE
    if (arr.length > 1) {
        return arr.shift() + sum(arr)
    } 
    //BASE CASES
    else if (arr.length == 0){ 
        return 0;
    } else {
        return arr[0];
    }
}

let r1 = sum([1,2,3,5]); 
console.log(r1);