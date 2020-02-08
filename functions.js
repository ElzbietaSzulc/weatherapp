// export const functions = {
//     celsiusToFarenheit: (temperature) => (temperature * 9) / 5 + 32,
// }
export const helpers = {
    celsiusToFarenheit: (temperature) => (temperature * 9) / 5 + 32,

    maxIconOccurency: (objWithIcons) => {
        let maxIcon = "";
        let maxOccunrency = 0;

        for (let icon in objWithIcons) {
            if (objWithIcons[icon] > maxOccunrency) {
                maxOccunrency = objWithIcons[icon];
                maxIcon = icon;
            }
        }

        return maxIcon;
    },
}