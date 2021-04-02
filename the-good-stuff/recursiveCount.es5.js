/**
 * An example of count that demonstrates recursive mechanisms.\ Destroys the array.
 * 
 * @param {*} arr 
 * @returns int
 * 
 */

function count(arr){
    var element = arr.pop();
    if (typeof element !== 'undefined'){
        //recursive case
        return 1 + count(arr);
    }else{
        if (arr.length === 0){
            //base case
            return 0;
        } else {
            return count(arr)
        }
    }
}