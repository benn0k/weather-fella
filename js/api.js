//* API Key
const appid = "appid=ae61075132cbaa8fb984d546e6783f50";

const citySearch = document.querySelector("#city-search");

//* Builds API call to return lat/lon data

function buildGeoCall(city) {
  //Initialize Variables for API Call
  const callBase = "http://api.openweathermap.org/geo/1.0/direct?";
  const cityName = `q=${city}`;

  //Put it all together
  const cityCallEndpoint = `${callBase}${cityName}&${appid}`;
  return cityCallEndpoint;
}

// API Call Handler

async function getAPIData(endpoint) {
  // console.log(`Generating endpoint data`);

  try {
    const response = await fetch(endpoint, { cache: "no-cache" });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    //todo - better error handling
  }
}

// * Returns a object with data based on City value
async function getData() {
  const { value: cityName } = citySearch;
  const city = cityName;

  // Build City Call
  const geoCallEndpoint = buildGeoCall(city);
  // https://api.openweathermap.org/geo/1.0/direct?q=fargo&appid={ID}

  // Generate city dat - generate lat/long for weather call
  const cityData = await getAPIData(geoCallEndpoint);

  // Catch error
  if (!cityData[0]) {
    citySearch.value = "";
    console.error("No vaild city found: check API call");
    //todo - better error handling
    return;
  }

  let lat = cityData[0].lat;
  let lon = cityData[0].lon;

  //Function to build URL for OpenWeather API
  function buildWeatherCall(lat, lon) {
    //Initialize Variables for API Call
    var lat = `lat=${lat}`;
    var lon = `lon=${lon}`;
    const callBase = "https://api.openweathermap.org/data/2.5/weather?";
    //Put it all together
    var weatherCallEndpoint = `${callBase}${lat}&${lon}&units=imperial&${appid}`;
    return weatherCallEndpoint;
  }
  // Build weather call with lat/lon of selected city
  const weatherCallEndpoint = buildWeatherCall(lat, lon);
  //  https://api.openweathermap.org/data/2.5/weather?lat=90&lon=90&appid={ID}

  // Generate data, return data
  const weatherData = await getAPIData(weatherCallEndpoint);
  return weatherData;
}

export { getData };
