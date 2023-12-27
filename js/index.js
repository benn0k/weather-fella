//TODO - Build function to return lat/lon from Geolocated area 

//Function to build URL for API
function buildCall(lat,lon) {
//Initialize Variables for API Call
const appid = 'appid=ae61075132cbaa8fb984d546e6783f50';
var lat = `lat=${lat}`;
var lon = `lon=${lon}`;
var callBase = 'https://api.openweathermap.org/data/2.5/weather?';
//Build URL
var callURL = `${callBase}${lat}&${lon}&${appid}`
return (callURL);
}
// * https://api.openweathermap.org/data/2.5/weather?lat=90&lon=90&appid={ID}
const apiCall = buildCall(90,90);

// Return 
  async function getWeather()  {
  const endpoint = apiCall;
  console.log(`Generating weather data`)
  try {
    const response = await fetch(endpoint, {cache: 'no-cache'});
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
       
    }
  }
  catch(error) {
    console.log(error);
  }
}

let weatherData = await getWeather();

console.log(weatherData.main.temp);










