import { displayData } from "./helpers.js";

const searchButton = document.querySelector(".search-button");
const citySearch = document.querySelector("#city-search");

searchButton.addEventListener("click", displayData);

//Run displayData on "enter" keypress
citySearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    displayData();
  }
});

export { citySearch };
