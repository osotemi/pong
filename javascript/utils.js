/**
 *  Used to avoid image double click selection default behaviour
 */

"use strict";

function clearSelection() {
     if(document.selection && document.selection.empty) {
         document.selection.empty();
     } else if(window.getSelection) {
         var sel = window.getSelection();
         sel.removeAllRanges();
     }
 }

function setCookie(cname, cvalue, exdays) {
    if (cvalue && cvalue!== ""){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function showPlayerProfile(){
  var user = getCookie("username");
  if (user && user!==""){
    var nicknameElement=document.getElementById("playerLeft");
    nicknameElement.innerHTML= user;
    var dataImage = localStorage.getItem('imgData');
    if (dataImage){
      var profileImg=document.createElement("img");  
      profileImg.src = "data:image/png;base64," + dataImage;
      profileImg.width=48;
      profileImg.height=64;

      nicknameElement.parentNode.insertBefore(profileImg,nicknameElement);
    }
    return true;
  }else{
    return false;
  }
}

function checkCookie(addGameKeyBindings) {

    var user = getCookie("username");
    if (user !== "") {
        showPlayerProfile();
        addGameKeyBindings();
    } else {
        // Get the modal
        var modal = document.getElementById('myModal');
        document.getElementById('blah').style.display="none";
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            if (showPlayerProfile()){
              modal.style.display = "none";
              addGameKeyBindings();
            }
        };
        window.onclick = function(event) {
          if (event.target == modal) {
            if (showPlayerProfile()){
              modal.style.display = "none";
              addGameKeyBindings();
            }
          }
        };
        modal.style.display = "block";

        var nickname = document.getElementById("nickname_");
        nickname.addEventListener("change",function(){setCookie("username", nickname.value, 365);});
        nickname.addEventListener("blur",function(){setCookie("username", nickname.value, 365);});
        nickname.addEventListener("focus",function(){setCookie("username", nickname.value, 365);});

        var imgProfile = document.getElementById("imgProfile");
        imgProfile.addEventListener("change",function(){readURL(this);});
    }
    document.getElementById("playerRight").innerHTML= "Computer";
}

function getBase64Image(img, final_width, final_height) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");

    canvas.width = final_width;
    canvas.height = final_height;

    ctx.drawImage(img, 0, 0,final_width, final_height);
    //Image riseze bug solution

    var dataURL = canvas.toDataURL("image/jpg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
/*
function drawCanvas(img_src){
  var p1_avatar_img = new Image(img_src);
  var avatar_img = getBase64Image( p1_avatar_img );

  p1_avatar_img.src = "data:image/png;base64," + avatar_img;

  var canvas = document.createElement("canvas");
  var context = canvas.getContext('2d');
  profileImg.width=48;
  profileImg.height=64;

  context.drawImage(p1_avatar_img, (((vpWidth/100)*21) - p1_avatar_img.width) ,0);
}
*/
function save(){
  var bannerImage = document.getElementById('blah');
  var imgData = getBase64Image(bannerImage, 48, 64);
  localStorage.setItem("imgData", imgData);
}

function readURL(input) {
  var img_element = document.getElementById('blah');
  if (input.files && input.files[0]) {
      img_element.style.display="block";
      var reader = new FileReader();
      reader.onload = function (e) {
        img_element.style.width=48;
        img_element.style.height=64;
        document.getElementById("blah").src=e.target.result;
        //$('#blah').attr('src', e.target.result);
        save();

      };
      reader.readAsDataURL(input.files[0]);
  }
}

 module.exports.clearSelection = clearSelection;
 module.exports.checkCookie = checkCookie;
