var smile = function(){
  var $html = $("<b>:)</b>");

  $html.css({
    "display": "block",
    "position": "fixed",
    "bottom": "10px",
    "right": "10px",
    "-webkit-transform": "rotate(90deg)",
    "font-family": "Inconsolata, monospace"
  });

  $("body").append($html);
};

var insertDeskHash = function(){
  chrome.storage.local.get("deskHash", function(storage){
    $("input.desk-hash").val(storage.deskHash);
  });
};

$(document).ready(function(){
  smile();
  insertDeskHash();
});
