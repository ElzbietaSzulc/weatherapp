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
        try {
            return new Date(item)
                .toDateString("MMMM")
                .split(" ")
                .slice(0, 3)
                .join(" ");
        }
        catch (error) {
            return 'Invalid Date';
        }
    },
    updateTime: timeDate => {
        try {
            return timeDate
                .toString()
                .split(" ")
                .slice(0, 5)
                .join(" ");
        }
        catch (error) {
            return 'Time format is invalid';
        }
    },

    updateDate: updateTime => {
        try {
            return updateTime
                .split(" ")
                .slice(0, 3)
                .join(" ");
        }
        catch (error) {
            return 'Invalid time';
        }
    },

    updateHour: updateTime => {
        try {
            return updateTime
                .split(" ")
                .slice(4)
                .join(" ");
        }
        catch (error) {
            return 'Invalid time';
        }
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

    getDataForecast: forecastList => {
        let container = {};

        for (let i = 0; i < forecastList.length; i++) {
            const dateOfForecast = forecastList[i].dt_txt.split(' ').slice(0, 1);

            if (!container.hasOwnProperty(dateOfForecast)) {
                container[dateOfForecast] = [];
            }
            container[dateOfForecast].push(
                forecastList[i].main.temp_min,
                forecastList[i].main.temp_max
            );
        }

        return Object.entries(container).slice(0, 4);
    },

    updateTreeDayForecast: (temperaturesData, Kelvin) => {
        for (const key in temperaturesData) {
            const minTemp = Math.min(...temperaturesData[key][1]);
            const maxTemp = Math.max(...temperaturesData[key][1]);
            temperaturesData[key][1] = Math.floor(minTemp - Kelvin);
            temperaturesData[key][2] = Math.floor(maxTemp - Kelvin);
        }
    },

    getWeatherForecast: (data, Kelvin) => {
        const temperaturesData = helpers.getDataForecast(data.list);
        helpers.updateTreeDayForecast(temperaturesData, Kelvin);

        return {
            'date1': helpers.getDataNextDay(temperaturesData[1][0]),
            'date2': helpers.getDataNextDay(temperaturesData[2][0]),
            'date3': helpers.getDataNextDay(temperaturesData[3][0]),
            'minTemp1': JSON.stringify(temperaturesData[1][1]),
            'maxTemp1': JSON.stringify(temperaturesData[1][2]),
            'minTemp2': JSON.stringify(temperaturesData[2][1]),
            'maxTemp2': JSON.stringify(temperaturesData[2][2]),
            'minTemp3': JSON.stringify(temperaturesData[3][1]),
            'maxTemp3': JSON.stringify(temperaturesData[3][2]),
        }
    }
}