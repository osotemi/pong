/*
 * Crea una instància de Stick.
 * Amb aquest objecte creem la barra que el jugador té que controlar per fer rebotar la bola al sobre i no perdre vides
 *
 * @constructor
 * @this {Stick}
 * @param {id_stick} ,side {left or right}
 *
 */
"use strict";

var withObserver = require('./patterns/observer/Observer');

function Stick(id_stick,side,context,autopilot) {
  this.autopilot = autopilot || false;
  this.imgObj = document.getElementById(id_stick);

  this.side= side || "left" ; //right or left,
  this.gap=50;    //Distance in pixels from side
  this.context = context;
  this.imgObj.height = this.context.vpHeight*0.2;
  this.side=="left"?this.imgObj.style.left=this.gap+'px':this.imgObj.style.left=this.context.vpWidth-this.imgObj.width-this.gap;

  //New variables to calculate ball bouncin
  this.lastY_position = "";//on %
  this.velocity = 0;

  var self = this;
  //We inherit from observer using this functional mixin
  withObserver.call(Stick.prototype);
  //We enroll stick as a ball observer
  this.context.ball.AddObserver(this);

  if (! this.autopilot){
      //We move stick on y axis following mouse pointer location
      window.addEventListener("mousemove",
        function(e){
          var y= (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
          self.locate(self.x,y);
      },false);
  }

  ///As an Observer we should implement this mandatory method. Called
  //everytime the object we observe (in this case ball) call to Notify Subject metthod
  this.Update = function (ball){
      //ball.locate();
      var ballPosition = ball.getPosition();

      var stickPosition = this.getPosition();

      if (this.autopilot) this.locate(stickPosition.x,(ballPosition.y-(Math.round(Math.random()))));
      //var limit=this.context.vpHeight - this.gap - ball.imgObj.width;
      var ballCloseStickLeft = (this.side=="left" && ballPosition.x<=stickPosition.x+this.imgObj.width);
      var ballCloseStickRight = (this.side=="right" && ballPosition.x+ball.imgObj.width>=stickPosition.x);

      if (  ballCloseStickLeft || ballCloseStickRight) {

          var distance=Math.abs((stickPosition.y+this.imgObj.height/2)-(ballPosition.y+ball.imgObj.height/2));
          var minDistAllowed=(this.imgObj.height/2+ball.imgObj.height/2);
          if (distance<minDistAllowed) {
              ball.rebota();
          }else{
            if ((ballPosition.x < this.gap) || (ballPosition.x > this.context.vpWidth - this.gap)){
                this.context.stop();
                alert("Game OVER");
                this.context.ball.locate((this.context.vpWidth/2)-this.context.ball.imgObj.width,(this.context.vpHeight/2)-this.context.ball.imgObj.height);  //Posicionem pilota al mig
            }
        }
    }
  };
}// End Stick Prototype

//Draw stick on screen using coordinates
Stick.prototype.locate = function(x,y){

    if (y>(this.context.vpHeight-this.imgObj.height)) y=this.context.vpHeight-this.imgObj.height;
    //this.x=x;this.y=y;
    this.imgObj.style.left = (Math.round(x))+ 'px';
    this.imgObj.style.top = (Math.round(y)) + 'px';
    if(this.lastY_position !== ""){
      this.getAceleration();
      this.lastY_position = Math.round(this.imgObj.style.top/(this.context.vpHeight/100));
    }
    else{
      this.lastY_position = Math.round(this.imgObj.style.top/(this.context.vpHeight/100));
    }
};

Stick.prototype.getPosition = function(){
     return {x:parseInt(this.imgObj.style.left),y:parseInt(this.imgObj.style.top)};
};

Stick.prototype.resize = function(){
  var new_Y_position = Math.round(this.context.vpHeight*(this.lastY_position/100));
  this.imgObj.height = this.context.vpHeight*0.2;
  this.side=="left"?this.imgObj.style.left=this.gap+'px':this.imgObj.style.left=this.context.vpWidth-this.imgObj.width-this.gap;
  this.locate(self.x, new_Y_position);
}

Stick.prototype.getAceleration = function(){
    //using the aceleration formula in pixels / miliseconds
    var distance = this.lastY_position - this.imgObj.style.top;
    if( distance < 0){
      distance *= -1;
    }

    this.velocity = distance / 8; //8 are the miliseconds that gets an interval
}

module.exports = Stick;
