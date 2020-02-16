export const helpers = {
    celsiusToFarenheit: (temperature) => {
        if (Number.isInteger(temperature)) {
            return (temperature * 9) / 5 + 32;
        } else {
            return null
        }
    },

    maxIconOccurency: (objWithIcons) => {
        let maxIcon = '';
        let maxOccunrency = 0;

        for (let icon in objWithIcons) {
            if (objWithIcons[icon] > maxOccunrency) {
                maxOccunrency = objWithIcons[icon];
                maxIcon = icon;
            }
        }
        return maxIcon;
    },

    countIconsForecast: (data) => {
        if (!(typeof data === 'object' && data !== null)) {
            return null;
        }

        let iconsForecast = {};
        for (let i = 0; i < data.length; i++) {
            if (iconsForecast[data[i]] == undefined) {
                iconsForecast[data[i]] = 1;
            } else {
                iconsForecast[data[i]] += 1;
            }
        }

        return iconsForecast;
    },

    // show error when there is an issue with geolocation service

    showError: error => {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p>${error.message} </p>`;
    },

    getDataNextDay: item => {
        return new Date(item)
            .toDateString("MMMM")
            .split(" ")
            .slice(0, 3)
            .join(" ");
    },
    updateTime: timeDate => {
        return timeDate
            .toString()
            .split(" ")
            .slice(0, 5)
            .join(" ");
    },

    updateDate: updateTime => {
        return updateTime
            .split(" ")
            .slice(0, 3)
            .join(" ");
    },

    updateHour: updateTime => {
        return updateTime
            .split(" ")
            .slice(4)
            .join(" ");
    },

    updateWeatherTime: (weather, data) => {
        var timeDate = new Date(0);
        timeDate.setUTCSeconds(data);
        const updateTime = helpers.updateTime(timeDate);
        weather.date = helpers.updateDate(updateTime);
        weather.hour = helpers.updateHour(updateTime);
    },

    updateWeatherData: (weather, data, Kelvin) => {
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
    },

    updateWeatherGeolocation: (weather, data) => {
        weather.city = data.name;
        weather.country = data.sys.country;
    },

    updateWeather: (weather, data, Kelvin) => {
        helpers.updateWeatherData(weather, data, Kelvin);
        helpers.updateWeatherGeolocation(weather, data);
        helpers.updateWeatherTime(weather, data.dt);
    },
    getDataForecast: () => {
        let container = {};

        for (var i = 0; i < dataForecast.list.length; i++) {
            var dateOfForecast = dataForecast.list[i].dt_txt.split(" ").slice(0, 1);
            var minTempOfForecast = dataForecast.list[i].main.temp_min;
            var maxTempOfForecast = dataForecast.list[i].main.temp_max;
            if (!container.hasOwnProperty(dateOfForecast)) {
                container[dateOfForecast] = [];
            }
            container[dateOfForecast].push(minTempOfForecast, maxTempOfForecast);
        }
    },

    getWeatherForecast: (dataForecast, Kelvin) => {

        //const contDateTemp = Object.entries(container).slice(0, 4);
        const contDateTemp = getDataForecast();

        for (const key in contDateTemp) {
            const minTemp = Math.min(...contDateTemp[key][1]);
            const maxTemp = Math.max(...contDateTemp[key][1]);
            contDateTemp[key][1] = Math.floor(minTemp - Kelvin);
            contDateTemp[key][2] = Math.floor(maxTemp - Kelvin);
        }

        return {
            'date1': helpers.getDataNextDay(contDateTemp[1][0]),
            'date2': helpers.getDataNextDay(contDateTemp[2][0]),
            'date3': helpers.getDataNextDay(contDateTemp[3][0]),
            'minTemp1': JSON.stringify(contDateTemp[1][1]),
            'maxTemp1': JSON.stringify(contDateTemp[1][2]),
            'minTemp2': JSON.stringify(contDateTemp[2][1]),
            'maxTemp2': JSON.stringify(contDateTemp[2][2]),
            'minTemp3': JSON.stringify(contDateTemp[3][1]),
            'maxTemp3': JSON.stringify(contDateTemp[3][2]),
        }
    }
}