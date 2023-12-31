export { sanitizeData, displayData };
import { getData } from "./api.js";

// * Bundles data into usable object
function sanitizeData(weatherData) {
  const name = weatherData.name;
  const temp = weatherData.main.temp;
  console.log(weatherData);
  console.log(temp);
}

//* Displays data
async function displayData() {
  // Get data from API and set to weatherData
  let weatherData = await getData();
  // catch error
  if (!weatherData) {
    return;
  }
  // Returns an object with only the needed data
  weatherData = sanitizeData(weatherData);
}
