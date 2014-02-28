$(document).ready(function(){

  var dateStamp = function(){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

    var months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

    var stamp;
    var t = new Date();

    stamp = days[t.getDay()].substring(0,3) + ", ";
    stamp += months[t.getMonth()].substring(0,3) + " ";
    stamp += t.getDate();

    return stamp;
  }();

  var timeStamp = function(){
    var t = new Date();
    var hours = t.getHours();

    return dateStamp + ", " + hours;
  }();

  //

  var Clock = function(){

    var $el = $("#clock");

    function updateClock(){
      var currentTime = new Date();
      var currentHours = currentTime.getHours();
      var currentMinutes = currentTime.getMinutes();
      currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

      $el.html(currentHours + ":" + currentMinutes);
    }

    updateClock();
    var intervalID = window.setInterval(updateClock, 10000);

  };

  //

  var Desk = function(){
    var desk = localStorage["desk"] || "•";

    var $el = $("<h2 id='desk'></h2>");
    $el.text(desk);
    $(".clock-wrap").prepend($el);
  }

  //

  var Info = function(){
    var desk = localStorage["desk"];
    var day = JSON.parse(localStorage["day"] || "{}");
    var url = "http://aa-progress-tracker.herokuapp.com/api/pairs.json";

    function displayInfo(obj){
      displayDesks(obj);
      displayBar(obj);
    }

    function displayDesks(obj){
      var html = "<article id='desks'>";

      html += "<span>&times;</span>";
      html += "<h1>" + obj.day.toUpperCase() + " Desks</h1>"
      html += "<ul>";

      console.log(obj);

      for (var pairDesk in obj.pairs){
        if(!obj.pairs.hasOwnProperty(pairDesk)){
          continue;
        }

        html += "<li><strong>";
        html += (pairDesk < 10) ? "&nbsp;" : "";
        html += pairDesk + "</strong>";
        html += " &mdash; ";

        html += obj.pairs[pairDesk].map(function(student){
          var sHtml = "<a href='https://github.com/";
          sHtml += student.github + "'>";
          sHtml += student.name + "</a>";

          return sHtml;
        }).join(" &amp; ");

        html += "</li>";
      }

      html += "<ul></article>";

      $(".wrap")
        .append(html)
        .on("click", "#desk", function(event){
          $(".wrap").addClass("has-desks");
        })
        .on("click", "#desks > span", function(event){
          $(".wrap").removeClass("has-desks");
        });
    }

    function displayBar(obj){
      var html = "<p>";
      html += dateStamp + " &mdash; " + obj.day.toUpperCase();

      if(desk && obj.pairs[desk].length){
        html += " &mdash; ";

        html += obj.pairs[desk].map(function(student){
          var sHtml = "<a href='https://github.com/";
          sHtml += student.github + "'>";
          sHtml += student.name + "</a>";

          return sHtml;
        }).join(" &amp; ");
      }

      html += "</p>";

      $("#info").html(html);
    }

    if(day && day.dateStamp == dateStamp){
      displayInfo(day);
    } else {

      $.getJSON(url, function(data){

        day = data;
        day.dateStamp = dateStamp;
        localStorage["day"] = JSON.stringify(day);

        displayInfo(day);
      });
    }
  };

  //

  var Weather = function(){
    var url = "http://api.openweathermap.org/data/2.5/weather?id=5128581&units=metric";
    var weather = JSON.parse(localStorage["weather"] || "{}");

    function cToF(c){
      return parseInt((c * 5 / 9) + 32);
    }

    function displayWeather(obj){
      var c = parseInt(obj.main.temp);

      var html = "<em class='weather-left'>";
      html += obj.weather[0].main;
      html += "<span> &mdash; ";
      html += obj.weather[0].description;
      html += "</span></em>";
      html += "<em class='weather-right'><span>";
      html += cToF(c);
      html += "&deg; F / </span>";
      html += c;
      html += "&deg; C";
      html += "</em>";

      $("header").prepend(html);

      console.log(obj);
    }


    if(weather && weather.timeStamp == timeStamp){
      displayWeather(weather);
    } else {

      $.getJSON(url, function(data){

        weather = data;
        weather.timeStamp = timeStamp;
        localStorage["weather"] = JSON.stringify(weather);

        displayWeather(weather);
      });
    }
  };

  Clock();
  Desk();
  Info();
  Weather();
});