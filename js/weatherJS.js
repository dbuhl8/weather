

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
