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
  this.viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //ViewportX
  this.viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//ViewportY

  this.score=0;
  this.state = "stop"; //STOP OR RUN
  this.ball = new ball("bola",this);
  this.stick = new stick("stick","left",this);
  this.stick2 = new stick("stick2","right",this,true);
  this.restart();

}

Context.prototype.restart = function(){
    //intento actualizar el tamaño de la pantalla si ha havido resize
    var ball_pos = this.ball.getPosition();

    this.viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //ViewportX
    this.viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//ViewportY
    //ball resize

    this.ball.imageBallView.width = this.viewPortHeight*0.05;
    //stick resize
    var stick_position = this.stick.getPosition();
    var positionY_percent = Math.round(stick_position.y/(this.viewPortHeight/100));
    this.stick.resize(stick_position, positionY_percent);
    var stick_position = this.stick2.getPosition();
    this.stick2.resize(stick_position, positionY_percent);

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
