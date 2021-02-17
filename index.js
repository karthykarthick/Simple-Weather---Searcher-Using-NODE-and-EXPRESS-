const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    console.log("respose recieved");
    const query = req.body.cityName;
    const url =
       "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=90582edac32da819f08413ad8ebbcb45";
    https.get(url, function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        var weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var weatherDesc =  weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var url = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        res.write(" <p> The weather is currently" + weatherDesc + "</p>")
        res.write("<h1>the Temparature in "+ query +" is "+ temp + " Degree Celcius</h1>");
        res.write("<img src=" + url +">");
        res.send();
      });
    });
})

app.listen(3000, function () {
  console.log("server started on port 3000.");
});
