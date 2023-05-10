
let latitude = 0;
let longitude = 0;
const btn = document.getElementById("getWeatherBtn")

window.onload = function() {
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    document.getElementById("date").innerHTML = dateString;

    if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success)

	} else {
	  console.log("Geolocation is not available in your browser.");
	}
}

btn.addEventListener("click", () => {
    let forecast = [["M", 120], ["Tu", 113], ["W", 118], ["Th", -34], ["F", 121]]
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "°F";
      }
});

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude + " " + latitude)
}

// const xhr = new XMLHttpRequest
//  xhr.open("GET", "URL");
//  xhr.send();
//
//  xhr.onload() =  function() {
//    const body = JSON.parse(xhr.responseText);
//    let temperature = body.temperature;
//    let weatherStatus = body.weatherStatus;
//    document.getElementbyId("temperature").innerHTML = `Temperature: ${temperature}`
//    document.getElementbyId("weatherstatus").innerHTML = `Weather Status: ${weatherStatus}`
//    vim rules mf!!!!!!
//  }
//
// const xhr2 = new XHMLHttpRequest;
//  xhr2.open("GET", `http://localhost:3000/weather/${lat}/${lon}');
//  xhr2.send();
//  
//  xhr2.onload() = function() {
//      const body = JSON.parse(xhr2.responseText);
//      let forecast = body.forecast
//  }
//
//  let helloString = `In it is degrees`
//  let temp = 59
//  let city = 'Santa Cruz'
//  let finalString = `In ${city} it is ${temp} degrees`
