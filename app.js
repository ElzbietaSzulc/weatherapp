import { helpers } from './functions.js';
// Select elements
const dateElement = document.querySelector(".weather-data p");
const hourElement = document.querySelector(".weather-hour p");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const forecastMinTemp1 = document.querySelector(
    ".temperaturemin-value-nextDay1"
);
const forecastMaxTemp1 = document.querySelector(
    ".temperaturemax-value-nextDay1"
);
const forecastMinTemp2 = document.querySelector(
    ".temperaturemin-value-nextDay2"
);
const forecastMaxTemp2 = document.querySelector(
    ".temperaturemax-value-nextDay2"
);
const forecastMinTemp3 = document.querySelector(
    ".temperaturemin-value-nextDay3"
);
const forecastMaxTemp3 = document.querySelector(
    ".temperaturemax-value-nextDay3"
);
const forecastDate1 = document.querySelector(".weather-nextDay-1 p");
const forecastDate2 = document.querySelector(".weather-nextDay-2 p");
const forecastDate3 = document.querySelector(".weather-nextDay-3 p");
const forecastIcon1 = document.querySelector(".weather-icon-nextDay-1");
const forecastIcon2 = document.querySelector(".weather-icon-nextDay-2");
const forecastIcon3 = document.querySelector(".weather-icon-nextDay-3");

const buttonDarkMode = document.querySelector("#id-dark-mode");

//App data

const weather = {};
const forecastWeather = {};

weather.temperature = {
    unit: "celsius"
};

//App const and vars

const Kelvin = 273;
const key = "2282772f730e9f35f3daf057777f7633";
const forecastQuantity = 4;

//Check if browser supports geolocation

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//Set User's Position

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// show error when there is an issue with geolocation service

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message} </p>`;
}

//Get weather from api provider

function getWeather(latitude, logitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${logitude}&appid=${key}`;
    let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${logitude}&appid=${key}`;
    let data;
    let dataForecast;

    fetch(api)
        .then(function (response) {
            data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

            // time

            var timeDate = new Date(0);
            timeDate.setUTCSeconds(data.dt);
            const updateTime = timeDate
                .toString()
                .split(" ")
                .slice(0, 5)
                .join(" ");
            const updateDate = updateTime
                .split(" ")
                .slice(0, 3)
                .join(" ");
            const udpateHour = updateTime
                .split(" ")
                .slice(4)
                .join(" ");
            weather.date = updateDate;
            weather.hour = udpateHour;
        })
        .then(function () {
            displayWeather();
        });

    fetch(apiForecast)
        .then(function (responseForecast) {
            dataForecast = responseForecast.json();
            return dataForecast;
        })
        .then(function (dataForecast) {
            var container = {};

            for (var i = 0; i < dataForecast.list.length; i++) {
                var dateOfForecast = dataForecast.list[i].dt_txt.split(" ").slice(0, 1);
                var minTempOfForecast = dataForecast.list[i].main.temp_min;
                var maxTempOfForecast = dataForecast.list[i].main.temp_max;
                if (!container.hasOwnProperty(dateOfForecast)) {
                    container[dateOfForecast] = [];
                }
                container[dateOfForecast].push(minTempOfForecast, maxTempOfForecast);
            }

            const contDateTemp = Object.entries(container).slice(0, 4);
            for (const key in contDateTemp) {
                const minTemp = Math.min(...contDateTemp[key][1]);
                const maxTemp = Math.max(...contDateTemp[key][1]);
                contDateTemp[key][1] = Math.floor(minTemp - Kelvin);
                contDateTemp[key][2] = Math.floor(maxTemp - Kelvin);
            }
            const dataNextDay1 = new Date(contDateTemp[1][0])
                .toDateString("MMMM")
                .split(" ")
                .slice(0, 3)
                .join(" ");
            const dataNextDay2 = new Date(contDateTemp[2][0])
                .toDateString("MMMM")
                .split(" ")
                .slice(0, 3)
                .join(" ");
            const dataNextDay3 = new Date(contDateTemp[3][0])
                .toDateString("MMMM")
                .split(" ")
                .slice(0, 3)
                .join(" ");
            forecastWeather.date1 = dataNextDay1;
            forecastWeather.date2 = dataNextDay2;
            forecastWeather.date3 = dataNextDay3;
            forecastWeather.minTemp1 = JSON.stringify(contDateTemp[1][1]);
            forecastWeather.maxTemp1 = JSON.stringify(contDateTemp[1][2]);
            forecastWeather.minTemp2 = JSON.stringify(contDateTemp[2][1]);
            forecastWeather.maxTemp2 = JSON.stringify(contDateTemp[2][2]);
            forecastWeather.minTemp3 = JSON.stringify(contDateTemp[3][1]);
            forecastWeather.maxTemp3 = JSON.stringify(contDateTemp[3][2]);

            //Display weather for forecast
            var contForecast = {};
            for (var i = 0; i < dataForecast.list.length; i++) {
                var dateOfForecast = dataForecast.list[i].dt_txt.split(" ").slice(0, 1);
                var iconsForecast = dataForecast.list[i].weather[0].icon;

                if (!contForecast.hasOwnProperty(dateOfForecast)) {
                    contForecast[dateOfForecast] = [];
                }
                contForecast[dateOfForecast].push(iconsForecast);
            }
            for (var key in contForecast) {
                contForecast[key] = helpers.countIconsForecast(contForecast[key]);
            }

            for (var data in contForecast) {
                contForecast[data] = helpers.maxIconOccurency(contForecast[data]);
            }
            contForecast = Object.entries(contForecast).slice(1, 4);
            const icon = contForecast;

            forecastWeather.icon1 = icon[0][1];
            forecastWeather.icon2 = icon[1][1];
            forecastWeather.icon3 = icon[2][1];
        })
        .then(function () {
            displayWeather();
        });
}

// Display weather to ui
function displayWeather() {
    // current weather
    dateElement.innerHTML = `${weather.date}`;
    hourElement.innerHTML = `${weather.hour}`;
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

    // forecast  Testing
    forecastMinTemp1.innerHTML = `${forecastWeather.minTemp1}`;
    forecastMaxTemp1.innerHTML = `${forecastWeather.maxTemp1}`;
    forecastMinTemp2.innerHTML = `${forecastWeather.minTemp2}`;
    forecastMaxTemp2.innerHTML = `${forecastWeather.maxTemp2}`;
    forecastMinTemp3.innerHTML = `${forecastWeather.minTemp3}`;
    forecastMaxTemp3.innerHTML = `${forecastWeather.maxTemp3}`;
    forecastDate1.innerHTML = `${forecastWeather.date1}`;
    forecastDate2.innerHTML = `${forecastWeather.date2}`;
    forecastDate3.innerHTML = `${forecastWeather.date3}`;
    forecastIcon1.innerHTML = `<img src="icons/${forecastWeather.icon1}.png"/>`;
    forecastIcon2.innerHTML = `<img src="icons/${forecastWeather.icon2}.png"/>`;
    forecastIcon3.innerHTML = `<img src="icons/${forecastWeather.icon3}.png"/>`;
}

//when the user clicks on the temperature element
tempElement.addEventListener("click", function () {
    if (weather.temperature.value == undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = helpers.celsiusToFarenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}&deg<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

        forecastMinTemp1.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.minTemp1)
        )}`;
        forecastMaxTemp1.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.maxTemp1)
        )}`;
        forecastMinTemp2.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.minTemp2)
        )}`;
        forecastMaxTemp2.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.maxTemp2)
        )}`;
        forecastMinTemp3.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.minTemp3)
        )}`;
        forecastMaxTemp3.innerHTML = `${helpers.celsiusToFarenheit(
            Math.floor(forecastWeather.maxTemp3)
        )}`;
    } else {
        tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
        weather.temperature.unit = "celsius";

        forecastMinTemp1.innerHTML = `${forecastWeather.minTemp1}`;
        forecastMaxTemp1.innerHTML = `${forecastWeather.maxTemp1}`;
        forecastMinTemp2.innerHTML = `${forecastWeather.minTemp2}`;
        forecastMaxTemp2.innerHTML = `${forecastWeather.maxTemp2}`;
        forecastMinTemp3.innerHTML = `${forecastWeather.minTemp3}`;
        forecastMaxTemp3.innerHTML = `${forecastWeather.maxTemp3}`;
    }
});

//implementing dark mode
var checkbox = document.querySelector("input[name=theme]");

checkbox.addEventListener("change", function () {
    if (this.checked) {
        trans();
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        trans();
        document.documentElement.setAttribute("data-theme", "light");
    }
});

let trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
};