import { displayData } from "./helpers.js";

const button = document.querySelector("#search");

// //! Remove this when done testing
displayData();

button.addEventListener("click", displayData);

//todo - we should also allow return keypresses to work
//todo - currently, this only works when you click the word search
