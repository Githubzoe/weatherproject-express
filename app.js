const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "d7ccd62b17514d9b03b57d5eec0c695b";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<p>The weather is currently " + weatherDescription + ".</p>");
      res.write(
        "<h1>The temperature in" + query + " is " + temp + " degrees Celsius.</h1>"
      );
      res.write(
        "<img src=" + `http://openweathermap.org/img/wn/${icon}@2x.png` + ">"
      );
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
