// Select elements
const dateElement = document.querySelector(".weather-data p")
const hourElement = document.querySelector(".weather-hour p")
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const forecastMinTemp1 = document.querySelector(".temperaturemin-value-nextDay1");
const forecastMaxTemp1 = document.querySelector(".temperaturemax-value-nextDay1");
const forecastMinTemp2 = document.querySelector(".temperaturemin-value-nextDay2");
const forecastMaxTemp2 = document.querySelector(".temperaturemax-value-nextDay2");
const forecastMinTemp3 = document.querySelector(".temperaturemin-value-nextDay3");
const forecastMaxTemp3 = document.querySelector(".temperaturemax-value-nextDay3");
const forecastDate1 = document.querySelector(".weather-nextDay-1 p");
const forecastDate2 = document.querySelector(".weather-nextDay-2 p");
const forecastDate3 = document.querySelector(".weather-nextDay-3 p");
const forecastIcon1 = document.querySelector(".weather-icon-nextDay-1");
const forecastIcon2 = document.querySelector(".weather-icon-nextDay-2")
const forecastIcon3 = document.querySelector(".weather-icon-nextDay-3");

const buttonDarkMode = document.querySelector("#id-dark-mode");

//App data
const weather = {};
const forecastWeather = {};

weather.temperature = {
    unit: "celsius"
}


//App const and vars

const Kelvin = 273;
const key = "2282772f730e9f35f3daf057777f7633";
const forecastQuantity = 4;

//Check if browser supports geolocation
if ('geolocation' in navigator) {
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
    notificationElement.innerHTML = `<p>${error.message} </p>`
}

//Get weather from api provider

function getWeather(latitude, logitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${logitude}&appid=${key}`;
    let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${logitude}&appid=${key}`;
    let data;
    let dataForecast;
    //http://api.openweathermap.org/data/2.5/forecast?lat=17.03&lon=51.1&appid=2282772f730e9f35f3daf057777f7633

    fetch(api)
        .then(function (response) {
            //response = {"coord":{"lon":17.03,"lat":51.1},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":280.82,"pressure":1008,"humidity":93,"temp_min":278.71,"temp_max":282.04},"visibility":10000,"wind":{"speed":1.5,"deg":210},"rain":{},"clouds":{"all":75},"dt":1573317002,"sys":{"type":1,"id":1715,"country":"PL","sunrise":1573279046,"sunset":1573312438},"timezone":3600,"id":3081368,"name":"Wroclaw","cod":200}
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
            updateTime = timeDate.toString().split(" ").slice(0, 5).join(" ");
            updateDate = updateTime.split(" ").slice(0, 3).join(" ");
            udpateHour = updateTime.split(" ").slice(4).join(" ");
            weather.date = updateDate;
            weather.hour = udpateHour;

        })
        .then(function () {
            displayWeather();
        })

    fetch(apiForecast)
        .then(function (responseForecast) {
            dataForecast = responseForecast.json();
            return dataForecast;
        })
        .then(function (dataForecast) {
            var container = {};

            for (var i = 0; i < dataForecast.list.length; i++) {
                //for (var i = 1; i < forecastQuantity; i++) {
                var dateOfForecast = dataForecast.list[i].dt_txt.split(" ").slice(0, 1);
                var minTempOfForecast = dataForecast.list[i].main.temp_min;
                var maxTempOfForecast = dataForecast.list[i].main.temp_max;
                //console.log('out', dateOfForecast, minTempOfForecast, Object.keys(container));
                if (!container.hasOwnProperty(dateOfForecast)) {
                    //console.log('in',dateOfForecast, minTempOfForecast, Object.keys(container));
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
            const dataNextDay1 = new Date(contDateTemp[1][0]).toDateString("MMMM").split(" ").slice(0, 3).join(" ");
            const dataNextDay2 = new Date(contDateTemp[2][0]).toDateString("MMMM").split(" ").slice(0, 3).join(" ");
            const dataNextDay3 = new Date(contDateTemp[3][0]).toDateString("MMMM").split(" ").slice(0, 3).join(" ");
            //const dataNextDay3 = new Date(contDateTemp[3][0]).toDateString("MMMM").split(" ").slice(0, 3).join(" ");
            forecastWeather.date1 = dataNextDay1;
            forecastWeather.date2 = dataNextDay2;
            forecastWeather.date3 = dataNextDay3;
            forecastWeather.minTemp1 = JSON.stringify(contDateTemp[1][1]);
            forecastWeather.maxTemp1 = JSON.stringify(contDateTemp[1][2]);
            forecastWeather.minTemp2 = JSON.stringify(contDateTemp[2][1]);
            forecastWeather.maxTemp2 = JSON.stringify(contDateTemp[2][2]);
            forecastWeather.minTemp3 = JSON.stringify(contDateTemp[3][1]);
            forecastWeather.maxTemp3 = JSON.stringify(contDateTemp[3][2]);

            //display weather for forecast
            var contForecast = {};
            for (var i = 0; i < dataForecast.list.length; i++) {
                var dateOfForecast = dataForecast.list[i].dt_txt.split(" ").slice(0, 1);
                var iconsForecast = dataForecast.list[i].weather[0].icon;

                if (!contForecast.hasOwnProperty(dateOfForecast)) {
                    //console.log('in',dateOfForecast, minTempOfForecast, Object.keys(container));
                    contForecast[dateOfForecast] = [];
                }
                contForecast[dateOfForecast].push(iconsForecast);
            }
            //console.log(contForecast);

            for (var key in contForecast) {
                contForecast[key] = xxx(contForecast[key])
            }


            //{
            // 2019-11-27: {04n: 1}
            // 2019-11-28: {04n: 6, 03d: 1, 04d: 1}
            // 2019-11-29: {03n: 2, 04n: 3, 04d: 1, 10d: 1, 10n: 1}
            // 2019-11-30: {03n: 1, 13n: 3, 13d: 2, 04n: 1, 02n: 1}
            // 2019-12-01: {01n: 4, 01d: 2, 02n: 1, 04n: 1}
            // 2019-12-02: {04n: 3, 04d: 2, 01n: 1, 02n: 1}
            //}

            for (var data in contForecast) {
                contForecast[data] = maxIconOccurency(contForecast[data])
            }
            //console.log(Object.entries(contForecast).slice(1, 3));
            contForecast = Object.entries(contForecast).slice(1, 4);
            const icon = contForecast;
            //console.log(icon);
            forecastWeather.icon1 = icon[0][1];
            forecastWeather.icon2 = icon[1][1];
            forecastWeather.icon3 = icon[2][1];

        })
        .then(function () {
            displayWeather();
        })
}

function maxIconOccurency(objWithIcons) {
    // example of the objWithIcons: {03n: 2, 04n: 3, 04d: 1, 10d: 1, 10n: 1}
    // return 04n

    let maxIcon = "";
    let maxOccunrency = 0;

    for (let icon in objWithIcons) {

        if (objWithIcons[icon] > maxOccunrency) {
            maxOccunrency = objWithIcons[icon];
            maxIcon = icon
        }
    }

    return maxIcon
}

function xxx(data) {
    var iconsForecast = {};

    for (var i = 0; i < data.length; i++) {
        if (iconsForecast[data[i]] == undefined) {
            iconsForecast[data[i]] = 1;
        } else {
            iconsForecast[data[i]] += 1;
        }
    }

    return iconsForecast
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

//C to F conversion
function celsiusToFarenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//when the user clicks on the temperature element
tempElement.addEventListener("click", function () {
    if (weather.temperature.value == undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFarenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}&deg<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

        forecastMinTemp1.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.minTemp1))}`;
        forecastMaxTemp1.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.maxTemp1))}`;
        forecastMinTemp2.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.minTemp2))}`;
        forecastMaxTemp2.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.maxTemp2))}`;
        forecastMinTemp3.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.minTemp3))}`;
        forecastMaxTemp3.innerHTML = `${celsiusToFarenheit(Math.floor(forecastWeather.maxTemp3))}`;
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

//darkmode
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}