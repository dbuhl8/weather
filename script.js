const request = require("request");
const express = require('express');

const app = express();

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});