$(document).ready(function(){

  localStorage["day"] = null;

  $("#input-desk").val(localStorage["desk"] || "");
  $("#input-password").val(localStorage["password"] || "");
  $("#input-city").val(localStorage["cityId"] || "");

  var saveForm = function(event){
    event.preventDefault();

    localStorage["desk"] = $("#input-desk").val();
    localStorage["cityId"] = $("#input-city").val();
    localStorage["password"] = $("#input-password").val();

    $("form").find("#info").addClass("show");
  };

  $("form").on("submit", saveForm);
  $("form").on("blur", "input", saveForm);

});
