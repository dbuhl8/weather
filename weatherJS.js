
let latitude = 0;
let longitude = 0;
const API_KEY = "59f4b52b2eb2c6eb0ce28e716f962fd8"
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

const xhr = new XMLHttpRequest
xhr.open("GET", "URL");
xhr.send();
  xhr.onload() =  function() {
    const body = JSON.parse(xhr.responseText);
    let temperature = body.temperature;
    let weatherStatus = body.weatherStatus;
    document.getElementbyId("temperature").innerHTML = `Temperature: ${temperature}`
    document.getElementbyId("weatherstatus").innerHTML = `Weather Status: ${weatherStatus}`
  }
  const xhr2 = new XHMLHttpRequest;
  xhr2.open("GET", `http://localhost:3000/weather/${lat}/${lon}`);
  xhr2.send();
  
  xhr2.onload() = function() {
      const body = JSON.parse(xhr2.responseText);
      let forecast = body.forecast
  var forecastElements = document.getElementsByClassName("forecast");
  for (var i = 0; i < forecast.length; i++) {
    forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`
  }
  }


app.get('/weather/:lat/:lon', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  
  var lat = req.params.lat;
  var lon = req.params.lon;
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  
	request(url, (error, response, body)=>{
		
		if(error) console.log(error)

		console.log(response.statusCode);
		 
		body = JSON.parse(body)
		console.log(body.main.temp);
    weatherStatus = body.weather[0].main
    res.send({"temperature" : body.main.temp}) 
	});
  
});

app.get('/5day/:lat/:lon', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  
  var lat = req.params.lat;
  var lon = req.params.lon;
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  
	request(url, (error, response, body)=>{
		
		if(error) console.log(error)
	   
		console.log(response.statusCode);
		 
		body = JSON.parse(body)
		console.log(body.main.temp);
	});
  todaysDate = new Date().getDay() // get’s today’s day
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let forecast = []
  for (let i = 0; i < 5; i++){
      let tempSum = 0
      let count = 0
      for (let  dataPoint in body.list){
          const date = new Date(dataPoint.dt * 1000)
          if (date.getDay() == todaysDate ){
              count++;
              tempSum += dataPoint.main.temp 
          }
      }
  const day = {"dayName": week[todaysDate], "temp": Math.round(tempSum / count) } 
  forecast.push(day) // Add the JSON datapoint to our forecast.
  todaysDate = (todaysDate  + 1) % 7 //Add 1 to the current day. If we reach day 7,then set to day 0
     }
     res.send({ forecast });
});

//
//  let helloString = `In it is degrees`
//  let temp = 59
//  let city = 'Santa Cruz'
//  let finalString = `In ${city} it is ${temp} degrees`
