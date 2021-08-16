const express = require("express");
const https = require("https");
const parser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(parser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {

  res.render("index");

});

app.post("/", function(req, res) {
  var cityName = req.body.City;
  var countryName = req.body.Country;
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryName + "&appid=81e8248a4e05fc14793b5b6d2e8b4699&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const mydata = JSON.parse(data);
      const weather = mydata.main.temp+" °C";
      const weatherDescription = mydata.weather[0].description;
      const icon = mydata.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("post",{weather_title: weather, weather_des: weatherDescription, weather_img: imgUrl})

      // res.write("<h1 style='background-color:#DDDDDD; text-align:center; font-size:500%;'>The temperature in " + cityName + " is " + weather + " degree celcius.</h1>");
      // res.write("<h2 style='background-color:#DDDDDD; text-align:center; font-size:300%;'>The weather is currently '" + weatherDescription + "'.</h2>");
      // res.write("<img style='widht:450px; height:450px; position:absolute; left: 35%; top:50%;' src=" + imgUrl + "></img>");
      // res.send();

    });
  });
});






app.listen(process.env.PORT || 3000, function() {
  console.log("the server is up running on server 3000");
});
