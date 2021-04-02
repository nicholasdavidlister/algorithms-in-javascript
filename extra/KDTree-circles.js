class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

class Region {
  constructor( minX , minY , maxX , maxY, parent=null ){
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
    this.parent = parent
    let sd = 'vertical'
    if (parent && parent.splitDirection === 'vertical') sd = 'horizontal'
    this.splitDirection = sd
    this.lteChild = null
    this.gtChild = null
    this.splitPoint = null
    this.circleRadius = null
    this.maxContainedCircle = 0
  }
}


class KDTree {
  constructor( minX , minY , maxX , maxY ){
    this.root = new Region( minX , minY , maxX , maxY )
  }
  regionContainingPoint( x , y ){
    let region = this.root
    while( region.lteChild ){
      if ( region.splitDirection === 'vertical' ){
        if ( x <= region.lteChild.maxX ){
          region = region.lteChild
        } else {
          region = region.gtChild
        }
      } else {
        if ( y <= region.lteChild.maxY){
          region = region.lteChild
        } else {
          region = region.gtChild
        }
      }
    }
    return region
  }
  addCircle( x , y , radius ){
    let region = this.regionContainingPoint( x , y )
    region.splitPoint = [ x , y ]
    region.maxContainedCircle = radius
    let parent = region.parent
    while( parent && parent.maxContainedCircle < radius ){
      parent.maxContainedCircle = radius
      parent = parent.parent
    }
    
    if ( region.splitDirection === 'vertical' ){
      let lte = new Region( region.minX, region.minY, x , region.maxY , region )
      region.lteChild = lte
      let gt = new Region( x , region.minY , region.maxX , region.maxY , region )
      region.gtChild = gt
    } else { //horizontal
      let lte = new Region( region.minX , region.minY , region.maxX , y , region )
      region.lteChild = lte
      let gt = new Region( region.minX , y , region.maxX , region.maxY , region )
      region.gtChild = gt
    }
  }
  findCircles( x , y , radius ){
    function directionFrom( rgn ){
      let direction = [0,0]
      if( x < rgn.minX ){
        direction[0] = -1
      } else if ( x > rgn.minX && x < rgn.maxY) {
        direction[0] = 0
      } else {
        direction[0] = 1
      }
      if( y < rgn.minY ){
        direction[1] = -1
      } else if ( y > rgn.minY && y < rgn.maxY ) {
        direction[1] = 0
      } else {
        direction[1] = 1
      }
      return direction.join('')
    }
    function distanceTo( region ){
      let dir = directionFrom( region )
      switch (dir){
        case '-1-1':
          let legX = rgn.minX - x
          let legY = rgn.minY - y
          return Math.sqrt( legX**2 + legY**2 )
        case '-10':
          return rgn.minX - x
        case '-11':
          let legX = rgn.minX - x
          let legY = y - rgn.maxY
          return Math.sqrt( legX**2 + legY**2 )
        case '0-1':
          return rgn.minY - y
        case '01':
          return y - rgn.maxY
        case '1-1':
          let legX = x - rgn.maxX
          let legY = rgn.minY - y
          return Math.sqrt( legX**2 + legY**2 )
        case '10':
          return x - rgn.maxX
        case '11':
          let legX = x - rgn.maxX
          let legY = y - rgn.maxY
          return Math.sqrt( legX**2 + legY**2 )
      }
    }
    let region = this.regionContainingPoint( x , y )
    let q = [ region ]
    let visited = new Set()
    let foundCircles = []
    while ( q.length > 0 ){
      let rgn = q.shift()
      visited.add( rgn )
      q.push( rgn.parent )
      let lte = rgn.lteChild
      let gt = rgn.gtChild
      if ( 
        lte.splitPoint &&
        distanceTo(lte) - lte.maxContainedCircle <= radius &&
        !visited.has(lte)
      ) {
        q.push(lte)
      }

      if ( 
        gt.splitPoint &&
        distanceTo(gt) - gt.maxContainedCircle <= radius &&
        !visited.has(gt)
      ) {
        q.push(gt)
      }
      //is circle at split point in our set
      let legX = Math.abs( x - rgn.splitPoint[0] )
      let legY = Math.abs( y - rgn.splitPoint[1] )
      let distToCenter = Math.sqrt( legX**2 + legY**2 )
      if ( distToCenter - rgn.circleRadius <= radius ){
        foundCircles.push( new Circle(rgn.splitPoint[0] , rgn.splitPoint[1] , rgn.circleRadius) )
      }
    }
    return foundCircles
  }
  
  
  print(){
    let q = [ [this.root,0] ]
    let output = []
    while ( q.length ){
      let next = q.shift()
      let node = next[0]
      let level = next[1]
      output[level] = output[level] || [] 
      output[level].push( `${node.minX},${node.minY}:${node.maxX},${node.maxY}` )      
      if (node.lteChild){
        q.push( [ node.lteChild , level + 1 ] )
        q.push( [ node.gtChild , level + 1 ] )
      }
    }
    for (let i = 0 ; i < output.length ; i++ ){
      console.log( output[i].join(' | ') )
    }
  }
}

let kdt = new KDTree( 0 , 0 , 10 , 10 )
kdt.addCircle( 3, 5 , 1)
kdt.addCircle( 2, 6 , 2)
kdt.addCircle( 5, 6 , 3)
kdt.addCircle( 7, 1 , 4)
kdt.addCircle( 5, 9 , 5)
kdt.print()





class CircleFinder {
  constructor(circles) {
  }
  
  // faster than O(n)
  find(searchCircle) {
    
  }
}

const circles = [
  new Circle(0, 0, 5),
  new Circle(0, 10, 5),
  new Circle(10, 10, 5),
  new Circle(-10, 0, 5),
  new Circle(-10, -10, 5)
];

const finder = new CircleFinder(circles);

finder.find(new Circle(0, 0, 4));