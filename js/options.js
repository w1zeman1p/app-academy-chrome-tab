$(document).ready(function(){

  $("#input-desk").val(localStorage["desk"] || "");
  $("#input-password").val(localStorage["password"] || "");

  var saveForm = function(event){
    event.preventDefault();

    console.log("asdfasd");

    localStorage["desk"] = $("#input-desk").val();
    localStorage["password"] = $("#input-password").val();

    $("form").find("#info").addClass("show");
  };

  $("form").on("submit", saveForm);
  $("form").on("blur", "input", saveForm);

});
