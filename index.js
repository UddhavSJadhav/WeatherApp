const x = document.getElementById("demo");
const temperature = document.getElementById("temp");
oopsGlobal = 0;
document.getElementById("celsius").disabled = true;
var main = document.getElementById("main");
var body = document.getElementById("body");
var date = new Date();
if (date.getHours() < 6 || date.getHours() > 18) {
  // if (true) {
  main.setAttribute("class", "main-night");
  document
    .getElementById("sun-container")
    .setAttribute("style", "display:none;");
  document.getElementById("rays").setAttribute("style", "display:none;");
} else {
  document.getElementById("stars").setAttribute("style", "display:none;");
  document
    .getElementById("moon-container")
    .setAttribute("style", "display:none;");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Connectivity Problem";
  }
}

function changeTempType(condiTion = "true") {
  if (condiTion) {
    document.getElementById("celsius").disabled = true;
    document.getElementById("fahrenheit").disabled = false;
    temperature.innerHTML = oopsGlobal + "°C";
  } else {
    document.getElementById("celsius").disabled = false;
    document.getElementById("fahrenheit").disabled = true;
    var new_temp = (oopsGlobal * 9.0) / 5 + 32;
    temperature.innerHTML =
      new_temp.toString().match(/\d\d\d.\d|\d\d\d|\d\d.\d|\d\d/) + "°F";
  }
}

function displayTemp(data) {
  const { temp, temp_min, temp_max } = data.main;
  const { description } = data.weather[0];
  const { name } = data;
  bodyColor(temp, description);
  oopsGlobal = temp.toString().match(/\d\d\d.\d|\d\d\d|\d\d.\d|\d\d/);
  temperature.innerHTML = oopsGlobal + "°C";
  document.getElementById("desc").innerHTML = description.toUpperCase();
  document.getElementById("name").innerText = name;
  document.getElementById("temp_min").innerText = "Max: " + temp_min + " °C";
  document.getElementById("temp_max").innerText = "Min: " + temp_max + " °C";
}

function showPosition(position) {
  let wapi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c00d27541c75cbec8614c39a843061d6&units=metric`;
  fetch(wapi)
    .then((response) => response.json())
    .then((data) => displayTemp(data));
}

function bodyColor(temp, weather_desc) {
  var weather_desc_regex = /clear|haze|storm|mist|cloudy/;
  if (temp > 34) {
    body.setAttribute(
      "style",
      "background: linear-gradient(180deg,rgb(247, 105, 4) 0%,rgb(255, 174, 0) 100%);"
    );
  } else if (temp > 26 && temp <= 34) {
    body.setAttribute(
      "style",
      "background: linear-gradient(180deg,rgb(255, 174, 0) 0%,rgb(98, 250, 230) 100%);"
    );
  } else if (temp > 20 && temp <= 26) {
    body.setAttribute(
      "style",
      "background: linear-gradient(180deg,rgb(98, 250, 230) 0%,rgb(191, 245, 252) 100%);"
    );
  } else if (temp <= 20) {
    body.setAttribute(
      "style",
      "background: linear-gradient(180deg,rgb(133, 241, 255) 0%,rgb(179, 224, 250) 100%);"
    );
  }
}
