class Model {
  constructor() {
    this.citiesData = [];
  }

  getCities() {
    return $.get("/weather").then((citiesWeatherDataResult) => {
      this.citiesData = citiesWeatherDataResult;
      return this.citiesData;
    });
  }

  getCity(cityName) {
    if (cityName !== "") {
      return $.get(`weather/${cityName}`);
    }
  }

  addCity(cityWeatherData) {
    $.post("weather/", cityWeatherData).then(() => {});
  }
  deleteCity(cityName) {
    $.ajax({
      url: `weather/${cityName}`,
      type: "DELETE",
      success: function (result) {},
    });
    return this.citiesData;
  }
}
