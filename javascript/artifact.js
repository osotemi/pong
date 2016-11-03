/**
   prototype we bounce an image on screen
 *
 * @constructor
 * @this {Artifact}
  *
 */
 "use strict";
var animate = undefined;
var subject = require('./patterns/observer/Subject');

var Artifact = function (id_artifact,context_) {

  this.imgObj = document.getElementById(id_artifact);
  this.state = "stop"; //startdbl,startclick
  this.speed = 7; //1 - 20;
  this.context = context_;
  //New direcction variables
  //this.angle = 135;
  this.travel = [];//Colecction of dots that the ball have to pass to go to the next bouncing ball
  this.interval = "";

  this.imgObj.width = this.context.vpHeight*0.05;
  var self=this; //Artifici per fer funcionar setInterval
  this.getArtifactSelf = function(){return self;};

}; //END  Ball prototype constructor

//Heretem de subject (REVIEW IS NOT PROPER)
Artifact.prototype = new subject();

Artifact.prototype.setDirection = function(){
    var angle = this.angle;
    if( 0 < angle && 90 > angle ){
      this.dirX = +1;
      this.dirY = -1;
    }
    else if( 90 < angle && 180 > angle ){
      this.dirX = -1;
      this.dirY = -1;
    }
    else if( 180 < angle && 270 > angle ){
      this.dirX = -1;
      this.dirY = +1;
    }
    else{
      this.dirX = +1;
      this.dirY = +1;
    }
};
//Meneja la bola
Artifact.prototype.move = function(){
    var travel_size = this.travel.length;
    var position = this.getPosition();
    if( this.travel[travel_size -1] !== ""){
      //locate to the next point of the travel path

    }

    this.locate(parseInt(this.imgObj.style.left)+(this.dirX*this.speed),parseInt(this.imgObj.style.top)+(this.dirY*this.speed));
}; //End move method

Artifact.prototype.getPosition = function(){
     return {x:parseInt(this.imgObj.style.left),y:parseInt(this.imgObj.style.top)};
};

Artifact.prototype.rebota = function(){
    //depends of the angle (asing the oposite angle); if they bounce on a stick or on the top - botton of the screen
    //this.angle +=
};
//Posicionem Bola de manera absoluta en X i Y i comprovem llímits
Artifact.prototype.locate = function(x,y){
    //Ens eixim per dalt o per baix
    if (y<=0 || y>=this.context.vpHeight-this.imgObj.height) {
        this.dirY=this.dirY*(-1);
    }
    //Ens eixim per dreta o esquerre
    if (x<=0 || x>=this.context.vpWidth-this.imgObj.width) this.dirX=this.dirX*(-1);

    this.imgObj.style.left = (Math.round(x))+ 'px';
    this.imgObj.style.top = (Math.round(y)) + 'px';

    this.Notify(this);
 }; //End locate method

 //calculates the points X, Y that the artifact will follow on this angle
 Artifact.prototype.getTravelPath = function(){
   var angle = this.angle;
   if( 90 < angle && 180 > angle ){
     //in this  dir, ball will bounce  when x= 0 + stick position + stick width  or y = 0
     //var C1_module = Math.;
     var C2_module = this.imgObj.style.top;


   }
 }

 //Sortejem direcció i comencem a moure la pola
 Artifact.prototype.start = function(){
    var self=this.getArtifactSelf();
    self.state = "run";
    self.setDirection();
    self.getTravelPath();
    animate=setInterval(function(){self.move();}, 8);
 };

 //Parem la bola
 Artifact.prototype.stop = function(){
     this.state = "stop";
     clearTimeout(animate);
 };

module.exports = Artifact;
