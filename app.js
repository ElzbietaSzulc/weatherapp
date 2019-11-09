// Select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//App const and vars

const Kelvin = 273;
const key = "2282772f730e9f35f3daf057777f7633";

//Check if browser supports geolocation
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//Set User's Position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// show error when there is an issue with geolocation service

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message} </p>`
}

//Get weather from api provider

function getWeather(latitude, logitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${logitude}&appid=${key}`;
    let data;

    fetch(api)
        .then(function(response){
            //response = {"coord":{"lon":17.03,"lat":51.1},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":280.82,"pressure":1008,"humidity":93,"temp_min":278.71,"temp_max":282.04},"visibility":10000,"wind":{"speed":1.5,"deg":210},"rain":{},"clouds":{"all":75},"dt":1573317002,"sys":{"type":1,"id":1715,"country":"PL","sunrise":1573279046,"sunset":1573312438},"timezone":3600,"id":3081368,"name":"Wroclaw","cod":200}
            data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
                displayWeather();
        })
}
// Display weather to ui
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F conversion
function celsiusToFarenheit(temperature) {
    return (temperature*9/5) + 32;
}

//when the user clicks on the temperature element
tempElement.addEventListener("click", function(){
    if (weather.temperature.value == undefined ) return;
    
    if (weather.temperature.unit == "celsius" ){
        let fahrenheit = celsiusToFarenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}&deg<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});
