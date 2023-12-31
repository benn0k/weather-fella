import { displayData } from "./helpers.js";

const button = document.querySelector("#search");

//! Remove this when done testing
displayData();

button.addEventListener("click", displayData);
