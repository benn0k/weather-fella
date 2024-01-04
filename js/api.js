export { getData }; //! move to bottom of file

//Grab City Value from DOM

// * Returns a object with data based on City value
async function getData() {
  //* API Key
  //! this id would typically be stored in a .env file IF we were using a server for fetching and formatting the data. However since this is a client-side app, its unavoidable to have the key exposed.
  const appid = "appid=ae61075132cbaa8fb984d546e6783f50";

  // Grab value from search, set to 'city'
  //! all 3 should be "const" here
  let citySearch = document.querySelector("#city-search");
  let cityName = citySearch.value; // ! you could destructure this instead with a rename like so: const { value: cityName } = citySearch;
  let city = cityName;

  //Function to build URL for geocoding API
  //! I'm not a huge fan of declaring functions inside of functions, but this is a personal preference. I would move this function to the top of the file and then use it here.
  function buildGeoCall(city) {
    //Initialize Variables for API Call
    const callBase = "http://api.openweathermap.org/geo/1.0/direct?";
    var cityName = `q=${city}`; //! should be "const"

    //Put it all together
    var cityCallEndpoint = `${callBase}${cityName}&${appid}`; //! should be "const"
    return cityCallEndpoint;
  }

  // Build City Call
  const geoCallEndpoint = buildGeoCall(city);
  // https://api.openweathermap.org/geo/1.0/direct?q=fargo&appid={ID}

  // Generate city dat - generate lat/long for weather call
  let cityData = await getData(geoCallEndpoint); // ! should be a "const"

  // Catch error
  if (!cityData[0]) {
    citySearch.value = "";
    console.error("No vaild city found: check API call");
    //todo - generate a more visable warning
    //todo - catch 'null' errors - if I search for nothing, I get an unspecified error
    return;
  }

  let lat = cityData[0].lat;
  let lon = cityData[0].lon;

  //Function to build URL for OpenWeather API
  function buildWeatherCall(lat, lon) {
    //Initialize Variables for API Call
    var lat = `lat=${lat}`;
    var lon = `lon=${lon}`;
    const callBase = "https://api.openweathermap.org/data/2.5/weather?";
    //Put it all together
    var weatherCallEndpoint = `${callBase}${lat}&${lon}&units=imperial&${appid}`;
    return weatherCallEndpoint;
  }
  // Build weather call with lat/lon of selected city
  const weatherCallEndpoint = buildWeatherCall(lat, lon);
  //  https://api.openweathermap.org/data/2.5/weather?lat=90&lon=90&appid={ID}

  // API Call Handler
  //! again i'd move this out of the parent function, but this is a personal preference. Especially since its being hoisted to line 34 right now. That can be confusing
  async function getData(endpoint) {
    // console.log(`Generating endpoint data`);

    try {
      const response = await fetch(endpoint, { cache: "no-cache" });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Generate data, return data
  let weatherData = await getData(weatherCallEndpoint); // ! should be a "const"
  return weatherData;
  //todo - return API call, will probably need to structure this data into an array and return that
}
