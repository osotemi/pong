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
/*
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
*/
function checkCookie(){
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
    save();
    closeModalForm();
  }
}
//Canvas utils
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function save(){
    var player_avatar_elem = document.getElementById('player_avatar');
    player_avatar = getBase64Image( player_avatar );
    localStorage.setItem("player_avatar", player_avatar);
}

function load(){
    var avatar_stored = localStorage.getItem('player_avatar');
    avatar_elem = document.getElementById('welcome_avatar');
    avatar_elem.src = "data:image/png;base64," + avatar_stored;
}

function drawScore(p1_name, score1, score2, p2_name, p1_avatar, p2_avatar){
    //p1_name, p1_avatar, p2_name, p2_avatar
    //Viewport Width
    var vpWidth=window.innerWidth	|| document.documentElement.clientWidth
		|| document.body.clientWidth;
	  //Viewport Width
	  var vpHeight=window.innerHeight || document.documentElement.clientHeight
		|| document.body.clientHeight;
    var canvas = document.getElementById('canvas_score');
    canvas.width=vpWidth-((vpWidth/100)*20);
    canvas.height=vpHeight-((vpHeight/100)*80);
    var context = canvas.getContext('2d');

    var fontsize=canvas.height/4;
    context.font = 'bolder '+fontsize+'pt Helvetica';
    context.fillStyle = 'blue';
    context.fillText(p1_name + ' ' + score1 + ' - ' + score2 + ' ' + p2_name , ((vpWidth/100)*21), (vpHeight/20));
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
  //checkCookie();
}

function openModalWelcome( username ){
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
  document.getElementById('light_welcome').style.display='block';
  document.getElementById('fade_welcome').style.display='block';
  document.getElementById('messeg_welcome').textContent = "Welcome again " + username;
  load();
}

function closeModalWelcome(){
  document.getElementById('light_welcome').style.display='none';
  document.getElementById('fade_welcome').style.display='none';
  //checkCookie();
  p1_name = getCookie("username");
  p2_name = "player2";
  drawScore(p1_name, 0, 0, p2_name);
}



module.exports.clearSelection = clearSelection;
module.exports.checkCookie = checkCookie;
module.exports.closeModalWelcome = closeModalWelcome;
module.exports.closeModalForm = closeModalForm;
module.exports.getPlayerData = getPlayerData;
//module.exports. =
