const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.post('/', function(req, res){
    const city = req.body.cityName;
    const apiKey = "1591e2a0f65eea08f061a3111eae61aa";
    const unit = "metric"
    const link = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
    https.get(link, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
            console.log(weatherDescription);
            res.write('<p>The weather is ' + weatherDescription + ' .</p>');
            res.write('<h1>The temperature in ' + city + ' currenly is ' + temp + ' degree celsius.</h1>');
            res.write("<img src = " + imgURL + "></img>");
            res.send();
        });
    });
    
});



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});