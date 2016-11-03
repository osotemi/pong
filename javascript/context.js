/**
 * Context prototype.
 * With this object (Singleton) by the way. We manage game context: points, on/off, balls location
 * on screen. It is a bridge to reach all objects that compose the game
 *
 * @constructor
 * @this {Context}
 */
"use strict";

var ball = require('./ball');
var stick = require('./stick');

function Context(){
  this.score=0;
  this.state = "stop"; //STOP OR RUN
  this.ball = new artifact("bola",this);
  this.stick = new stick("stick","left",this);
  this.stick2 = new stick("stick2","right",this,true);
  this.restart();

  this.getvpWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //ViewportX
  this.getvpHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//ViewportY
  /*
  //We put ball in the middle of the screen
  this.ball.locate((this.vpWidth/2)-(this.ball.imgObj.width/2),(this.vpHeight/2)-this.ball.imgObj.height);
  //Vertical dotted separator decoration
  var verticalSeparator = document.getElementById("vertical");
  var verticalSeparatorWidth = this.vpWidth * 0.02;
  verticalSeparator.style="left:"+(this.vpWidth/2-verticalSeparatorWidth/2)+";border-left: "+verticalSeparatorWidth+"px dotted #444; ";
*/
}

Context.prototype.restart = function(){
    //intento actualizar el tamaño de la pantalla si ha havido resize
    this.viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //ViewportX
    this.viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//ViewportY
    if(this.ball){
      var ball_pos = this.ball.getPosition();
      this.ball.imgObj.width = this.vpHeight*0.05;
      this.stick.resize;
      this.stick2.resize;
    }

    //We put ball in the middle of the screen
    this.ball.locate((this.viewPortWidth/2)-(this.ball.imageBallView.width/2),(this.viewPortHeight/2)-this.ball.imageBallView.height);
    //Vertical dotted separator decoration
    var verticalSeparator = document.getElementById("vertical");
    var verticalSeparatorWidth = this.viewPortWidth * 0.02;
    verticalSeparator.style="left:"+(this.viewPortWidth/2-verticalSeparatorWidth/2)+";border-left: "+verticalSeparatorWidth+"px dotted #444; ";

};

Context.prototype.start = function(){
    this.state = "run";
    this.ball.start();
};

Context.prototype.stop = function(){
    this.state = "stop";
    this.ball.stop();
};

module.exports = Context;
