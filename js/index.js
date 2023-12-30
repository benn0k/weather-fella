import { getData } from "./api.js";

// TODO - Hook this up to a click handler
let weatherData = await getData();
console.log(weatherData);

// Desctructure Data into HTML and Inject it into DOM
