import { getData } from "./api.js";

// * Remove unused data, returns an object
function sanitizeData(weatherData) {
  const { name, main, clouds, wind, sys, visibility } = weatherData; // destructure the object
  const { sunrise, sunset } = sys; // destructure the sys object

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

  //Iterate through mainWeather
  // Object.keys(dataObject.mainWeather).forEach((item) => {
  //   if (typeof dataObject.mainWeather[item] == "number") {
  //     dataObject.mainWeather[item] = Math.floor(dataObject.mainWeather[item]);
  //     console.log(dataObject.mainWeather[item]);
  //   }
  // });

  console.log(dataObject);
  return dataObject;
}

//* Displays data

async function displayData() {
  try {
    // Get data from API and set to weatherData
    const weatherData = await getData();
    // catch error
    if (!weatherData) {
      console.error("No data returned from API");
      return;
    }
    // Returns an object with only the needed data
    const sanitizedData = sanitizeData(weatherData);
    console.log(weatherData);

    //New HTML Fragment, target HTML element we're going to append it to
    const fragment = new DocumentFragment();
    const targetElement = document.getElementById("results-container");

    //Build "Title" of weather fragment
    const title = document.createElement("span");
    title.classList.add("card-title");
    title.setAttribute("id", "results-title");
    title.textContent = `Weather conditions in ${sanitizedData.name}:`;
    fragment.appendChild(title);
    // Build "Temp" of weather fragment

    const currentTemp = document.createElement("span");
    currentTemp.setAttribute("id", "temp");
    currentTemp.textContent = `Currently, the temperature is ${sanitizedData.mainWeather.temp}°F. It feels like ${sanitizedData.mainWeather.feels_like}°F. `;
    fragment.appendChild(currentTemp);

    // Append Fragment to results card
    targetElement.appendChild(fragment);
  } catch {
    console.error("Cannot Display Data");
  }
}

export { displayData, sanitizeData };
