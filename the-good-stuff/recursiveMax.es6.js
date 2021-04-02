/*
arr = [2,4,3]
max(arr)
    //decimate
    //return the higher of self and the returned value
*/

function max(arr){
    //INPUT VALIDATION GOES HERE
    if(arr.length > 1){
       //recursive case
        let el = arr.pop();
        let r = max(arr);
        if (el > r) 
            return el;
        else
            return r;
    } 
    //Base Cases
    else if (arr.length == 0){
        return null;
    } else {
        return arr[0];
    }
}