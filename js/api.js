export { cityData, weatherData };

//* API Key

const appid = "appid=ae61075132cbaa8fb984d546e6783f50";
//? Better way to obfuscate this?

//Function to build URL for geocoding API
function buildGeoCall(city) {
  //Initialize Variables for API Call
  const callBase = "http://api.openweathermap.org/geo/1.0/direct?";
  var cityName = `q=${city}`;

  //Put it all together
  var cityCallEndpoint = `${callBase}${cityName}&${appid}`;
  return cityCallEndpoint;
}

//!TODO - Hook up Search from frontend
let city = "fargo";

// Build City Call
const geoCallEndpoint = buildGeoCall(city);
// https://api.openweathermap.org/geo/1.0/direct?q=fargo&appid={ID}

// Generate city date - generate lat/long for weather call
let cityData = await getData(geoCallEndpoint);
let lat = cityData[0].lat;
let lon = cityData[0].lon;

//Function to build URL for OpenWeather API
function buildWeatherCall(lat, lon) {
  //Initialize Variables for API Call
  var lat = `lat=${lat}`;
  var lon = `lon=${lon}`;
  const callBase = "https://api.openweathermap.org/data/2.5/weather?";
  //Put it all together
  var weatherCallEndpoint = `${callBase}${lat}&${lon}&${appid}`;
  return weatherCallEndpoint;
}

const weatherCallEndpoint = buildWeatherCall(lat, lon);
//  https://api.openweathermap.org/data/2.5/weather?lat=90&lon=90&appid={ID}

// Call Handler
async function getData(endpoint) {
  console.log(`Generating endpoint data`);

  try {
    const response = await fetch(endpoint, { cache: "no-cache" });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

//Generate Weather Data
let weatherData = await getData(weatherCallEndpoint);