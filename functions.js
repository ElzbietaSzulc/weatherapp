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
    }
}

