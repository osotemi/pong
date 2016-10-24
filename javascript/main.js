/**
 *  Pong  entry script
 *
 */

var utils = require('./utils');
var singletonContext = require('./patterns/singleton/singletonContext');

//Once the page has been completely loaded. Including images. We start the game
window.onload=function(){
    var context_ = singletonContext.getInstance();

    var startGame=function(event){
        event.preventDefault();
        utils.clearSelection();
        if (context_.state.match("run")){
          context_.stop();
        }else{
          context_.start();
        }
    };

    var closeForm = function(){
      utils.closeModalForm();
      window.addEventListener("keypress",startGame,false);
    };

    var closeWelcome = function(){
      utils.closeModalWelcome();
      window.addEventListener("keypress",startGame,false);
    }

    var onSubmit = function(){
      utils.getPlayerData(context_);
    }

    if(utils.switchInitModal()){//Cookie allready exist
      document.getElementById("close_welcome").onclick = closeWelcome;
    }
    else{
      document.getElementById("close_form").onclick = closeForm;
      document.getElementById("Submit").onclick = onSubmit;
    }

    //utilizar callback con la funcion chaeckCookie
};
