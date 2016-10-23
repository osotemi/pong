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

 function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);//Subtituir por pantalla de
        document.getElementById('light_welcome').style.display='block';
        document.getElementById('fade_welcome').style.display='block';
        document.getElementById("player_name").innerHTML = username;
    } else {
        document.getElementById('light').style.display='block';
        document.getElementById('fade').style.display='block';
        //username = prompt("Please enter your name:", "");//I
        if( context.validate.is_valid_form){
          username = context.form_player.getElement("name");
          setCookie("username", username, 365);
          document.getElementById('light').style.display='none';
          document.getElementById('fade').style.display='none';
        }
        if (username != "" && username != null) {
            username="player 1";
            setCookie("username", username, 365);
        }
    }
}

function closeWelcome(){
  document.getElementById('light_welcome').style.display='none';
  document.getElementById('fade_welcome').style.display='none';
}

 module.exports.clearSelection = clearSelection;
 module.exports.checkCookie = checkCookie;
