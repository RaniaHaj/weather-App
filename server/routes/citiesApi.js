const express = require("express");
const axios = require("axios");
const router = express.Router();
const City = require("../models/City");
const KEY = "03ef9d30428a71405fd3fac4a105422a";

const filterCityData = function (weatherApiData) {
  const filteringWeatherData = {
    name: weatherApiData.name,
    temperature: weatherApiData.main.temp,
    condition: weatherApiData.weather[0].description,
    conditionPic: `http://openweathermap.org/img/wn/${weatherApiData.weather[0].icon}.png`,
  };
  return filteringWeatherData;
};

router.get("/weather", function (req, res) {
  City.find({}).then(function (citiesWeather) {
    res.send(citiesWeather);
  });
});

router.get("/weather/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&units=metric&q=${cityName}`
    )
    .then((result) => {
      const filteringWeather = filterCityData(result.data);
      res.send(filteringWeather);
    });
});

router.post("/weather", function (req, res) {
  const city = new City(req.body);
  city.save().then(function () {
    res.status(201).send();
  });
});

router.delete("/weather/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  City.deleteOne({ name: cityName }).then(function (city) {
    res.status(204).send();
  });
});

module.exports = router;
