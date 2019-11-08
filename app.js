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

const Kelvin = 273;
const key = "2282772f730e9f35f3daf057777f7633";

//Check if browser supports geolocation
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    gwtWeather(latitude, longitude);
}

// show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//Get weather from api provider
function getWeather(latitude, logitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?
    lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch{api}
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weahter.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
                displayWeather();
        });
}

// Display weather to ui
funtion displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}o<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.county}`;      
}

