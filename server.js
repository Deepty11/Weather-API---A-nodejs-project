const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");
const { type } = require("os");
var description = "";

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function(req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,UK&appid=b8ecf18258ce57bf2a0c0edf870feb80&units=metric";
    http.get(url, function(response) {
        // console.log(response);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            description = weatherData.weather[0].description;
            console.log(weatherData);
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            console.log(icon)
            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


            res.write("<h1>Weather temperature :" + temp + " degree celcius </h1>");
            res.write("<img src=" + iconUrl + ">");
            res.write("<h1>Weather description:" + description + " </h1>");

            res.send();


        });

    });


});

app.get("/search-by-city", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/search-by-city", function(req, res) {
    var cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b8ecf18258ce57bf2a0c0edf870feb80&units=metric";
    http.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.set("Content-Type", "text/html");

            res.write("<h2>Weather forecast of" + cityName + " City:</h2>");
            res.write("<h2>Weather temperature :" + temp + " degree celcius </h2>");
            res.write("<p>Weather Description:" + weatherDescription + " degree celcius.</p>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });

});

app.listen(3000, function() {
    console.log("Server started listenning to port 3000");
});