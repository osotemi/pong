/**
 *   Ball prototype. We bounce an image on screen representing the ball
 *
 * @constructor
 * @this {Ball}
  *
 */
 "use strict";
var animate = undefined;
var subject = require('./patterns/observer/Subject');

var Ball = function (id_Ball,context_) {

  this.imageBallView = document.getElementById(id_Ball);
  this.state = "stop"; //startdbl,startclick
  this.speed = 2; //1 - 3 levels of the game: easy, medium and hard;
  this.context = context_;
  this.imageBallView.width = this.context.viewPortHeight*0.05;
  //Variables for Bresenham bouncin
  this.bouncingAngle = 0;
  this.currentBouncingPath = [];
  this.pathIndex = 0;

  var self = this; //Artifici per fer funcionar setInterval
  this.getBallSelf = function(){return self;};

  this.directions = {
    //NORTH:{dirX:0,dirY:-1},
    //SOUTH:{dirX:0,dirY:1},
    //EAST:{dirX:1,dirY:0},
    //WEST:{dirX:-1,dirY:0},
    NORTH_EAST:{dirX:1,dirY:-1},
    SOUTH_EAST:{dirX:1,dirY:1},
    SOUTH_WEST:{dirX:-1,dirY:1},
    NORTH_WEST:{dirX:-1,dirY:-1},
  };
}; //END  Ball prototype constructor

//Ball inherits from subject (WARNING: REVIEW THIS CODE. IS NOT PROPER)
Ball.prototype = new subject();

Ball.prototype.setDirection = function(CARDINAL_POINT){
    var definedDirectons = ["NORTH_EAST", "SOUTH_EAST", "SOUTH_WEST", "NORTH_WEST"];
    var randomDir = parseInt(Math.round(Math.random()*(definedDirectons.length - 1)));

    this.dirX = this.directions[definedDirectons[randomDir]].dirX;
    this.dirY = this.directions[definedDirectons[randomDir]].dirY;
};

//We move the ball to the next point
Ball.prototype.move = function(){
    var self = this.getBallSelf();
    var initPoint = self.getPosition();

    this.locate( initPoint.x + (self.dirX * self.bouncingPixelatedAngle.x ) , initPoint.y + (self.dirY * self.bouncingPixelatedAngle.y));

};

//Get ball coordinates
Ball.prototype.getPosition = function(){
     return {x:parseInt(this.imageBallView.style.left),y:parseInt(this.imageBallView.style.top)};
};

//Simply change direction sense. If we implement multi direction ball it should be a little bit more complicated
Ball.prototype.bounce = function(){
    this.dirX=this.dirX*(-1);
};

//We put ball in X,Y coordinates and check boundaries in order to change direction
Ball.prototype.locate = function(x,y){
    var self = this.getBallSelf();
    //If the ball is close to up or bottom limits
    if ((y < 0 && self.dirY < 0) || (y > self.context.viewPortHeight && self.dirY > 0) ){
      this.dirY=this.dirY*(-1);
    }
    /*Ball notifies all observers she has been moving to the next point (SOLVED: IT COULD BE OPTIMIZED)
    If the ball is in the first 20% of the screen and dirX < 0
    or 70% ahead and dirX > 0 (enought to autopilot stick2); notify position*/
    if( (x < (self.context.viewPortHeight*0.2) && self.dirX < 0) || ((x > (self.context.viewPortHeight*0.7)) && self.dirX > 0)){
      this.Notify(this);
    }

    this.imageBallView.style.left = (Math.round(x))+ 'px';
    this.imageBallView.style.top = (Math.round(y)) + 'px';
 };

 //We should RAMDOMLY (NOT YET) choose ball direction and start moving from her current position
 Ball.prototype.start = function(){
    var self = this.getBallSelf();
    self.state = "run";
    self.setDirection();
    /*The start angle is in the range
    easy (this.speed = 1)-> x: 2-3, y: 1-3
    normal (this.speed = 2)-> x: 2-6, y: 1-6
    hard (this.speed = 3)-> x: 2-9, y: 1-9
    Avoid values x = 0, x = 1 and y = 0; angles of ~0º, ~90º, ~180º, ~270º*/
    var xStartValue = (2 + parseInt(Math.round(Math.random()))) * self.speed;
    var yStartValue = (1 + parseInt(Math.round(Math.random() * 2))) * self.speed
    self.bouncingPixelatedAngle = { x : xStartValue, y : yStartValue,};

    animate=setInterval(function(){self.move();}, 8);
 };

 //Stop the ball
 Ball.prototype.stop = function(){
     this.state = "stop";
     clearTimeout(animate);
 };

module.exports = Ball;
