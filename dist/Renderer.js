class Renderer {
  renderCity(cityWeather) {
    const source = $("#city-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(cityWeather);
    $("#cities").append(newHTML);
  }

  renderCities(citiesWeather) {
    $("#cities-weather").empty();
    const source = $("#cities-template").html();
    const template = Handlebars.compile(source);
    const citiesWeatherData = {
      citiesWeather: citiesWeather,
    };
    const newHTML = template(citiesWeatherData);
    $("#cities").append(newHTML);
  }
}
