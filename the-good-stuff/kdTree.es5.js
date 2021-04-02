function Region( min_bounds , max_bounds , parent = null ){
    //check to ensure the vectors have the expected dimensions
    this.min_bounds = min_bounds
    this.max_bounds = max_bounds
    this.parent = parent
    this.aspect = ( parent ) ? ( parent.aspect + 1 ) % min_bounds.length : 0 
    this.point = null
    this.lte
    this.gt
}
Region.prototype.addPoint = function( vec ) {
    this.point = vec.slice()
    let lteMax = this.max_bounds.slice()
    lteMax[ this.aspect ] = this.point[ this.aspect ]
    this.lte = new Region( this.min_bounds , lteMax , this )
    let gtMin = this.min_bounds.slice()
    gtMin[ this.aspect ] = this.point[ this.aspect ] + 1  // This means we can only accept integer values in the vector
    this.gt = new Region( gtMin , this.max_bounds, this )
}


function KDTree( min_bounds , max_bounds ){
    this.root = new Region( min_bounds , max_bounds )
}
KDTree.prototype.add = ( vec ) => {
    //check to ensure the vector has the expected dimesions
    let node = this.root
    while( node.point ){
        if ( vec[ node.aspect ] > node.point[ node.aspect ] ) {
            node = node.gt
        } else {
            node = node.lte
        }
    }
    node.addPoint( vec )
    return
}
KDTree.prototype.findPointsInRadius = function( vec , radius ) {}



function direction( region , point ){
    var result = []
    for ( let d = 0 ; d < point.length ; d++ ){
        if ( point[d] < region[0][d] ) {
            result[d] = -1
        } else if (point[d] > region[1][d]) {
            result[d] = 1
        } else {
            result[d] = 0
        }
    }
}

function distance( point1 , point2 ){
    let cartesianDistances = []
    for ( let d = 0 ; d < point1.length ; d++ ){
        cartesianDistances.push(Math.abs( point1[d] - point2[d] ))
    }
    return Math.sqrt( cartesianDistances.reduce( (sum , val) => sum + val**2 ) )
}

function minDistance( point , region ){
    //accepts arguments in the form ( [x,y,z...] , [[minX,minY,minZ...][maxX,maxY,maxZ...]] )
    let direction = direction( region , point )
    let squaredDistances = []
    for ( let d = 0 ; d < direction.length ; d++ ){
        if ( direction[d] == 0 ) continue
        let sq
        if ( direction[d] < 0 ) {
            sq = Math.abs( point[d] - region[0][d] )**2
        } else {
            sq = Math.abs( point[d] - region[0][d] )**2
        }
        squaredDistances.push(sq)
    }
    if ( squaredDistances.length == 0 ) return 0
    return Math.sqrt( squaredDistances.reduce( (sum , val) => sum + val ) )
}