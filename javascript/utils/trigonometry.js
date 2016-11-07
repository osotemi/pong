/*
* collection of aritmetic functions to calculate bouncing angles, distance and bouncing points
*
*/

function calculatePythagorasTheorem( catetus1, catetus2 ) {
  var result = (Math.pow(catetus1, 2) + Math.pow(catetus2, 2));
  result =  Math.round(Math.pow( result, 0.5));
  //result = Math.round(Math.pow((Math.pow(catetus1, 2) + Math.pow(catetus2, 2)), 0.5))
  return result;
}

function calculateCateto2( catetus1, angle ) {
    return Math.round(catetus1/Math.tan(angle));
}
/* Funtion that returns an array with the points that the ball will have to travel
*  init point, bouncing point, angle
*
* returns path [{x:a0, y:b0}, {x:a1, y:b1}, {x:a2, y:b2} ... {x:an, y:bn}]
*/
function calculateVectorPath( bouncingData, ballSpeed ) {
    var repetitions = parseInt(Math.round(bouncingData.hypotenuseValue / ballSpeed));
    var vectorPath = [];
    for( var i = 0; i < repetitions; i++){
        vectorPath.push({ x: (bouncingData.initPointData.x + (bouncingData.coordinatesDirection.x * i * parseInt(bouncingData.cateto1mod / repetitions))), y: (bouncingData.initPointData.y + (bouncingData.coordinatesDirection.y * i * parseInt(bouncingData.cateto2mod / repetitions)))});
    }
    return vectorPath;
}

//Functions Limit bouncing
function bouncingTop( initPoint, angle ) {
  var bouncingPoint = {};

  if(angle < 90){
    bouncingPoint.x = initPoint.x - Math.round(initPoint.y/Math.tan(angle));
    bouncingPoint.y = 0;
  } else {
    bouncingPoint.x = initPoint.x - Math.round(initPoint.y/Math.tan(angle - 90));;
    bouncingPoint.y = 0;
  }
  return bouncingPoint;
}

function bouncingBottom( initPoint, angle, viewPortHeight ) {

}

function bouncingLeft( initPoint, angle ) {

}

function bouncingRight( initPoint, angle, viewPortWidth ) {

}
/* Function that returns boucing point, angle, hipotenusa
*  initPoint {x:a, y:b}
*  bouncingPoint {x:a, y:b}
*/
function calculateBouncing( initPoint, angle, context ) {
    var bouncingPointCoordinate = {};
    var direction = {};
    var reboundAngle = 0;
    var hypotenuse = 0;
    var cateto1 = 0;
    var cateto2 = 0;

    if(angle > 0 && angle < 90){
      direction.x = +1;
      direction.y = -1;
      //First calculates the point where y = 0 (hit the top of the screem)
      bouncingPointCoordinate = bouncingTop(initPoint, angle);
      //The ball goes right side out before hit the top of the screen
      if(bouncingPointCoordinate.x > context.viewPortWidth ){
        //Calculates the left side screen hit point
        bouncingPointCoordinate = bouncingLeft(initPoint, angle);
        reboundAngle = 180 - angle;
        cateto1 = context.viewPortWidth -  initPoint.x;
        cateto2 = initPoint.y - bouncingPointCoordinate.y;
        hypotenuse = calculatePythagorasTheorem( cateto1, cateto2);
      }
      else{//The ball goes top side before hit the right of the screen
        reboundAngle = 360 - angle;
        cateto1 = initPoint.y;
        cateto2 = bouncingPointCoordinate.x - initPoint.x;
        hypotenuse = calculatePythagorasTheorem( cateto1, cateto2);
      }

    } else if(angle > 0 && angle < 90){
      direction.x = -1;
      direction.y = -1;
    } else if(angle > 0 && angle < 90){
      direction.x = -1;
      direction.y = +1;
    } else {// 270 < angle >360
      direction.x = +1;
      direction.y = +1;
    }
    var bouncingData = {
      initPointData: initPoint,
      bouncingPoint : bouncingPointCoordinate,
      bouncingAngle: reboundAngle,
      hypotenuseValue : hypotenuse,
      coordinatesDirection : direction,
      cateto1mod: cateto1,
      cateto2mod: cateto2,
    };
    return calculateVectorPath( bouncingData, context.ball.speed );
}

module.exports.calculateBouncing = calculateBouncing;
