/*
 * Crea una instància de Form.
 *
 * @constructor
 * @this {Form}
 *
 */
var subject = require('./patterns/observer/Subject');

function Form( form_id, context_ ){
  this.context = context_;
  //get form element
  this.form_id = form_id;
  this.form_elem = document.getElementById(this.form_id);
  //current element
  this.active_input = "";
  this.active_type = "";
  this.active_value = "";
  this.active_id = "";

  var self=this; //Artifici binding
  this.getFormSelf = function(){return self;};
  this.getActiveInput = function(){return document.activeElement;};
  this.getActiveType = function(){return document.activeElement.getAttribute("pa-type");};
  this.getActiveValue = function(){return document.activeElement.value;};
  this.getActiveId = function(){return document.activeElement.getAttribute("id");};
  this.getElement = function( name ){return document.getElementById(name);};

  subject.call(this.prototype);
}

Form.prototype = new subject();

Form.prototype.setCurrent = function(){
  var self_form = this.getFormSelf();
  self_form.active_type = self_form.getActiveType();
  self_form.active_value = self_form.getActiveValue();
  self_form.active_input = self_form.getActiveInput();
  self_form.active_id = self_form.getActiveId();
}


Form.prototype.setError = function( error_type, error_msage ){
  var self_form = this.getFormSelf();
  var elem_id = self_form.active_id;//get element id
  var element = document.getElementById(elem_id + "_div");
  error_message_id = elem_id +"_error_message";
  //reinitiate error div
  this.removeError();

  var child = document.createElement('div');
  child.setAttribute( 'id', error_message_id);
  child.setAttribute( 'class', 'msg');
  child.setAttribute( 'display', 'block');

  if( error_type == "EMPTY" ){
    child.innerHTML = "This field can't be empty";
    element.appendChild( child);
  }
  else if( error_type == "PATTERN" ){
    child.innerHTML = error_msage;
    element.appendChild( child);
  }
  else if( error_type == "SPECIAL" ){
    child.innerHTML = error_msage;
    element.appendChild( child);
  }
};

Form.prototype.removeError = function( error_type, error_msage ){
  var self_form = this.getFormSelf();
  var elem_id = self_form.active_id;
  var element = document.getElementById(elem_id + "_div");
  var error_elem = document.getElementById( elem_id + "_error_message" );
  try{
    //If already have an error; remove it
    element.removeChild( error_elem );
  }catch(e){

  }
};

Form.prototype.submitForm = function(){
  this.context.validator_.validFormResult();
  if( this.context.validator_.is_valid_form ){
    return true;
  }
  return false;
}

Form.prototype.notifyEventForm = function(){
    this.Notify(this);
};

Form.prototype.init = function(){
  //Set focus on name
  this.form_elem.name.focus();
}

module.exports = Form;
