/**
 *  Used to avoid image double click selection default behaviour
 */
var context = require('./context');

function clearSelection() {
     if(document.selection && document.selection.empty) {
         document.selection.empty();
     } else if(window.getSelection) {
         var sel = window.getSelection();
         sel.removeAllRanges();
     }
 }

 function setCookie(cname, cvalue, exdays) {
     var d = new Date();
     d.setTime(d.getTime() + (exdays*24*60*60*1000));
     var expires = "expires="+ d.toUTCString();
     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
 }

 function getCookie(cname) {
     var name = cname + "=";
     var ca = document.cookie.split(';');
     for(var i = 0; i <ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') {
             c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
             return c.substring(name.length,c.length);
         }
     }
     return "";
 }

 function checkCookie(name, avatar) {
    var username= name || getCookie("username");
    var avatar = avatar;// || getAvatar
    var player1_name = document.getElementById("player1_name");//get canvas
    if (username!="" && username != null) {
        //alert("Welcome again " + username);//Subtituir por pantalla de
        player1_name.textContent = username;
        //canvas.avatar
    } else {
        //username = prompt("Please enter your name:", "");//I
        if (username === "" ||  username == NULL) {
            username="player 1";
            player1_name.textContent = username;
        }
    }
}

function switchInitModal (){
    var username = name || getCookie("username");
    if (username!="") {
        openModalWelcome( username );

        //Set avatar
        return true;
    } else {
        openModalForm();
        return false;
    }
}

function getPlayerData(context){

  if(context.form_player.submitForm){
    var username = document.getElementById("name").value;
    setCookie("username", username, 365);
    //get image/save image

  }
}

function openModalForm(){
  document.getElementById('light_welcome').style.display='none';
  document.getElementById('fade_welcome').style.display='none';
  document.getElementById('light').style.display='block';
  document.getElementById('fade').style.display='block';

}

function closeModalForm(){
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
  checkCookie();
}

function openModalWelcome( username ){
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
  document.getElementById('light_welcome').style.display='block';
  document.getElementById('fade_welcome').style.display='block';
  document.getElementById('messeg_welcome').textContent = "Welcome again " + username;
  //setCanvas
}

function closeModalWelcome(){
  document.getElementById('light_welcome').style.display='none';
  document.getElementById('fade_welcome').style.display='none';
  checkCookie();
}



module.exports.clearSelection = clearSelection;
module.exports.switchInitModal = switchInitModal;
module.exports.closeModalWelcome = closeModalWelcome;
module.exports.closeModalForm = closeModalForm;
module.exports.getPlayerData = getPlayerData;
//module.exports. =
