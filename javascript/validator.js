/*
* Validator prototype
*
* @constructor
* @this {Stick}
*
*/
var withObserver = require('./patterns/observer/Observer');

function Validator( context_ ){
  this.valid = "";

  this.context = context_;
  //If the result can be calculated
  this.enabled_result = false;
  this.change_result_field = false;
  //Fi is valid form
  this.is_valid_form = false;
  //Mistake variables
  this.current_errorType = "";// EMPTY; PATTERN; SPECIAL;
  this.current_errorMessege = "";

  this.validRequired = {
    valid_name : false,
    valid_avatar : false,
  };

  withObserver.call(Validator.prototype);
  //We enroll stick as a ball observer
	this.context.form_player.AddObserver(this);

  this.Update = function( form ){
    this.current_element = form.active_input;
    this.current_type = form.active_type;
    this.current_value =form.active_value;
    //Reinitiate change_result_field before change result field
    this.change_result_field = false;
    this.switchTypeValidate();

    if ( this.current_errorType != ""){
        form.setError( this.current_errorType, this.current_errorMessege );
    }
    else {
        form.removeError();
    }
  }
}

Validator.prototype.paTypeValidate = function( pattern ){
  var value = this.current_value;
  if (  value == ("Player name")){
     this.current_element.value = "";
     return false;
  }
  else if( value == "" && this.current_element.required ){
    this.current_errorType = "EMPTY";
    this.current_element.style.border = "1px solid red";
    //this.current_element.focus();
    return false;
  }
  else{
    if(!pattern.test(value)){
      this.current_errorType = "PATTERN";
      this.current_element.style.border = "1px solid red";
      return false;
    }
    else{
      this.current_errorType = "";
      this.current_element.style.border = "1px solid grey";
      return true;
    }
  }
};

Validator.prototype.check = function( is_valid ){
  switch (this.current_element.id) {
    case "name":
      this.validResultFields.valid_incoming = is_valid;
      this.change_result_field = true;
      break;
    case "avatar":
      this.validResultFields.valid_capital = is_valid;
      this.change_result_field = true;
      break;

    default://text
      //this.valid = is_valid;
  }

};

Validator.prototype.checkEnableResult = function(){
  var opt = "";
  this.change_result_field = true;
  this.enabled_result = true;
  for ( var i in this.validResultFields ) {
      opt = this.validResultFields[i];
      if ( opt === false ) {
        this.enabled_result = false;
      }
  }

};
//Function validate form
Validator.prototype.validFormResult = function(){
  var opt = "";
  this.is_valid_form = true;
  for ( var i in this.validRequired ) {
      opt = this.validRequired[i];
      if ( opt === false ) {
        this.is_valid_form = false;
      }
  }
  if(this.is_valid_form){
    this.checkEnableResult();
    if(!this.enabled_result){
      this.is_valid_form = false;
    }
  }
};

Validator.prototype.switchTypeValidate = function(){
  //patterns
  var text_pattern = /^[\d\w]{2,50}$/;

  switch (this.current_type) {
    case "avatar":
      this.check(this.paTypeValidate( money_pattern ));
      if( this.current_errorType == "PATTERN" ){
        this.current_errorMessege = "Money must be a number";
      }
      break;
    default://text
      this.check(this.paTypeValidate( text_pattern ));
      if( this.current_errorType == "PATTERN" ){
        this.current_errorMessege = "Only characters allowed";
      }
      break;
  }
  this.checkEnableResult();
};

module.exports = Validator;
