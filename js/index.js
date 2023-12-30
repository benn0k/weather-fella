import { getData } from "./api.js";
export { cityName };

// Buttons, Inputs
let citySearch = document.querySelector("#city-search");
let cityName = citySearch.value;

let weatherData = await getData();

console.log(weatherData);
