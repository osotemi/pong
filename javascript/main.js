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

    if(utils.switchInitModal()){//Cookie allready exist
      document.getElementById("close_welcome").onclick = utils.closeModalWelcome;
    }
    else{
      document.getElementById("close_form").onclick = closeForm;
      document.getElementById("Submit").onclick = function(){utils.getPlayerData(context_);};
    }

    //utilizar callback con la funcion chaeckCookie
};
