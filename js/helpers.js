export { sanitizeData, displayData };
import { getData } from "./api.js";

// * Remove unused data, returns an object
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

  // todo - can we normalize this data with a .floor? Get rid of decimal.
  // Return object

  return dataObject;
}

//* Displays data
async function displayData(object) {
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

  //New HTML Fragment, target HTML element we're going to append it to
  const fragment = new DocumentFragment();
  const targetElement = document.getElementById("results-container");

  //Build "Title" of weather fragment
  const title = document.createElement("span");
  title.classList.add("card-title");
  title.setAttribute("id", "results-title");
  title.textContent = `Weather conditions in ${weatherData.name}:`;
  fragment.appendChild(title);
  // Build "Temp" of weather fragment

  const currentTemp = document.createElement("span");
  currentTemp.setAttribute("id", "temp");
  currentTemp.textContent = `Currently, the temperature is ${weatherData.mainWeather.temp}°F. It feels like ${weatherData.mainWeather.feels_like}°F. `;
  fragment.appendChild(currentTemp);

  // Append Fragment to results card
  targetElement.appendChild(fragment);
}
