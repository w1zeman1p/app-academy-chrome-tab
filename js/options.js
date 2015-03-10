// SF: 37.7833 N, 122.4167 W
// NYC: 40.6700 N, 73.9400 W

var reset = function(){
  localStorage["day"] = null;
  localStorage["weather"] = null;
};

var ip = function(){
  if(localStorage["cityId"]){
    return;
  };

  var sfLong = -122;
  var nycLong = -74;
  var midLong = parseInt((sfLong + nycLong) / 2);

  $.getJSON("http://ipinfo.io/json", function(data) {

      localStorage["ip"] = JSON.stringify(data);
      var long = parseInt(data.loc.split(",")[1]);

      if(long > midLong){
        // NYC
        localStorage["cityId"] = "1";
      } else {
        // SF
        localStorage["cityId"] = "2";
      }

      loadForm();
  });
};

var bindForm = function(){
  $("form").on("submit", saveForm);
  $("form").on("blur", "input", saveForm);
};

var loadForm = function(){
  $("#input-desk").val(localStorage["desk"] || "");
  $("#input-password").val(localStorage["password"] || "");

  var checkedRadioInput = "#input-location input[value='" + (localStorage["cityId"] || "") + "']";
  $(checkedRadioInput).prop("checked", true);
};

var saveForm = function(event){
  event.preventDefault();

  localStorage["desk"] = $("#input-desk").val();
  localStorage["podId"] = $("#input-pod-id").val();
  localStorage["password"] = $("#input-password").val();
  localStorage["cityId"] = $("#input-location input:checked").val();

  chrome.storage.local.set({deskHash: hash(deskRecipe())}, showInfo);
};

var hash = function(value){
  return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
}

var deskRecipe = function(){
  var deskRecipe = "";

  ["cityId", "desk", "password"].forEach(function(key){
    deskRecipe += localStorage[key];
  });

  return deskRecipe;
};

var showInfoTimeout = null;

var showInfo = function(){
  var $info = $("form").find("#info")

  if(showInfoTimeout){
    window.clearTimeout(showInfoTimeout);
  }

  $info.addClass("show");
  showInfoTimeout = window.setTimeout(function(){
    $info.removeClass("show");
  }, 5000);
};

$(document).ready(function(){
  reset();
  ip();
  bindForm();
  loadForm();
});
