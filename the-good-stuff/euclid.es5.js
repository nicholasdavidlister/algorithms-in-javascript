function gcd( n1 , n2 ){
    const nums = ( Math.abs(n1) > Math.abs(n2) ) ? [n2,n1] : [n1,n2] 
    var r = nums[1] % nums[0]
    while( r ){
        nums[1] = nums[0]
        nums[0] = r
        r = nums[1] % nums[0]
    }
    return nums[0]
}