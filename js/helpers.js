import { getData } from "./api.js";
import { citySearch } from "./index.js";

//* Displays data
//todo - if I click search really fast, sometimes I get multiple sets of
async function displayData() {
  // Grab results dom element
  const targetElement = document.getElementById("results-container");

  // if search is empty
  if (citySearch.value.length === 0) {
    console.error("No search term provided");
    return;
  }
  // Clear out any results
  targetElement.textContent = "";

  try {
    // Get data from API and set to weatherData
    const weatherData = await getData();
    // catch error
    if (!weatherData) {
      //todo - this can be better
      console.error("No data returned from API");
      return;
    }
    // Returns an object with only the needed data
    const sanitizedData = sanitizeData(weatherData);
    console.log(sanitizedData);

    //New HTML Fragment, target HTML element we're going to append it to
    const fragment = new DocumentFragment();

    //Build "Title" of weather fragment
    const title = document.createElement("span");
    title.classList.add("card-title");
    title.setAttribute("id", "results-title");
    title.textContent = `Weather conditions in ${sanitizedData.name}:`;
    fragment.appendChild(title);

    // Build "Temp" of weather fragment
    const currentTemp = document.createElement("span");
    currentTemp.setAttribute("id", "temp");
    currentTemp.textContent = `Currently, the temperature is ${sanitizedData.mainWeather.temp}°F. It feels like ${sanitizedData.mainWeather.feels_like}°F `;
    fragment.appendChild(currentTemp);

    // Build Wind of weather fragment
    const windHTML = document.createElement("span");
    const windSpeed = sanitizedData.wind.speed;
    const windDirection = getDirection(sanitizedData.wind.deg);

    windHTML.setAttribute("id", "wind");
    if (windSpeed > 20) {
      windHTML.textContent = `Hang on! The wind will be blowing from the ${windDirection} at a speed of ${windSpeed}MPH `;
    } else {
      windHTML.textContent = `The wind will be blowing from the ${windDirection} at a speed of ${windSpeed}MPH `;
    }
    fragment.appendChild(windHTML);

    // Build Sunrise/Sunset fragment
    const sunrise = `${convertUnix(sanitizedData.sunrise)}AM`;
    const sunset = `${convertUnix(sanitizedData.sunset)}PM`;
    console.log(sunrise, sunset);

    windHTML.textContent = `Today, the sun will rise at ${sunrise}, and will set at ${sunset}`;
    fragment.appendChild(windHTML);

    // Append Fragment to results card
    targetElement.appendChild(fragment);
  } catch {
    console.error("Cannot Display Data");
  }
}

// * Remove unused data, returns an object
function sanitizeData(weatherData) {
  const { name, main, clouds, wind, sys, visibility } = weatherData; // destructure the object
  const { sunrise, sunset } = sys; // destructure the sys object

  // Iterate through object and floor out decimals
  const mainWeatherRounded = Object.keys(main).reduce((acc, key) => {
    const currentValue = main[key];

    // If the current item is a number, round it
    if (typeof currentValue == "number") {
      acc[key] = Math.floor(currentValue);
    } else {
      acc[key] = currentValue;
    }

    return acc;
  }, {});

  // Package the data into a new object
  const dataObject = {
    name,
    mainWeather: mainWeatherRounded,
    clouds,
    wind,
    sunrise,
    sunset,
    visibility,
  };

  return dataObject;
}

//* Converts Angle to Cardinal direction

function getDirection(angle) {
  var directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
}

// * Convert Timestamp to usable time
function convertUnix(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(timestamp * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();

  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Will display time in 10:30

  //This converts it into non-milatary time
  if (hours > 13) {
    const formattedTime = hours - 12 + ":" + minutes.substr(-2);

    return formattedTime;
  } else {
    const formattedTime = hours + ":" + minutes.substr(-2);

    return formattedTime;
  }
}

export { displayData };
