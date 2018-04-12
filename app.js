var apiKey = "407e19b730756742d7d1dad42a5efd76";




function setURL(config) {
    var targetURL = "https://api.openweathermap.org/data/2.5/weather?"
  
    var demo = {
      "demo": targetURL+"q="+ config.demo +"&APPID="+ apiKey,
      "withLatLon": targetURL+"lat="+ config.lat +"&lon="+ config.lon +"&APPID="+ apiKey,
    };
  
    return demo[config.type]
  }



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        demo.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    var config = {
        "type": "withLatLon",
        "lat": position.coords.latitude,
        "lon": position.coords.longitude,
      };
    
      var url = setURL(config)
    
      sendReq(url);
}



function getbyCityName() {
    var demo = document.getElementById("city").value;
    if(demo == ""){
       alert("Must input a city");
    }
    else{
        var config = {
            "type": "demo",
            "demo": demo
          }
          var url = setURL(config)
          sendReq(url);
    }
}


function sendReq(url) {

    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200){
            document.getElementById("demo").innerHTML = "";
            var data = JSON.parse(req.responseText);
            var weather = {};
            weather.id = data.weather[0].id;
            weather.desc = data.weather[0].description;
            weather.temp = Math.round(data.main.temp-273.15);
            weather.loc = data.name;
            weather.hum = data.main.humidity;
            weather.wind = data.wind.speed;
            updateIndex(weather);
        }
        else if(req.status == 404)
        {
            document.getElementById("demo").innerHTML = "city not found";
            document.getElementById("weatherInfo").style.display = "none";
            document.getElementById("loc").style.display = "none";
        }
        
    };
    req.open("GET", url , true);
    req.send(null);
}


function updateIndex(weather) {
    document.getElementById("loc").style.display = "block";
    document.getElementById("loc").innerHTML = "The weather for today in " + weather.loc;
    document.getElementById("weatherInfo").style.display = "block";
    document.getElementById("icon").src = "imgs/codes/" + weather.id + ".png";
    document.getElementById("temp").innerHTML = weather.temp + " &degC";
    document.getElementById("hum").innerHTML = weather.hum + "%";
    document.getElementById("wind").innerHTML = weather.wind;
    document.getElementById("desc").innerHTML = weather.desc
}
