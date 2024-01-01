export { sanitizeData, displayData };
import { getData } from "./api.js";

// * Bundles data into usable object
function sanitizeData(weatherData) {
  let dataObject = {};

  //Grab data from object and package into a simplified object
  const name = weatherData.name;
  dataObject.name = name;

  const mainWeather = weatherData.main;
  dataObject.mainWeather = mainWeather;

  const clouds = weatherData.clouds;
  dataObject.clouds = clouds;

  const wind = weatherData.wind;
  dataObject.wind = wind;

  const sunrise = weatherData.sys.sunrise;
  dataObject.sunrise = sunrise;

  const sunset = weatherData.sys.sunset;
  dataObject.sunset = sunset;

  const visibility = weatherData.visibility;
  dataObject.visibility = visibility;

  // Return object

  return dataObject;
}

//* Displays data
async function displayData() {
  // Get data from API and set to weatherData
  let weatherData = await getData();
  // catch error
  if (!weatherData) {
    console.error("No data returned from API");
    return;
  }
  // Returns an object with only the needed data
  weatherData = sanitizeData(weatherData);
  console.log(weatherData);
}
