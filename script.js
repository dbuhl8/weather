const request = require("request");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = "59f4b52b2eb2c6eb0ce28e716f962fd8"

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  
  
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=37.77493&lon=-122.41942&appid=${API_KEY}&units=imperial`
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
		// Printing body
		let data = JSON.parse(body)
        let temp = data.main.temp
        console.log(temp)
	});
  
  
});

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});