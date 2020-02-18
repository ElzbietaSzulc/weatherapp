const toTest = require("../functions.js");

describe('Check celsiusToFarenheit function', () => {
  test('Check if celsius to Farenheit convertion is defined', () => {
    expect(toTest.helpers.celsiusToFarenheit()).toBeNull();
  });

  test('Check if Celsius to Farenheit convertion returns valid value', () => {
    expect(toTest.helpers.celsiusToFarenheit(0)).toBe(32);
  });

  test('Invalid input check in celsiusToFarenheit function', () => {
    expect(toTest.helpers.celsiusToFarenheit(-5)).toBe(23);
    expect(toTest.helpers.celsiusToFarenheit('a')).toBeNull();
    expect(toTest.helpers.celsiusToFarenheit('1')).toBeNull();
    expect(toTest.helpers.celsiusToFarenheit(undefined)).toBeNull();
    expect(toTest.helpers.celsiusToFarenheit(null)).toBeNull();
  });
})

describe('Check maxIconOccurency function', () => {
  test('Object is empty', () => {
    expect(toTest.helpers.maxIconOccurency({})).toBe('');
  });

  test('Invalid input check in maxIconOccurency function', () => {
    expect(toTest.helpers.maxIconOccurency(null)).toBe('');;
    expect(toTest.helpers.maxIconOccurency(undefined)).toBe('');
    expect(toTest.helpers.maxIconOccurency(1)).toBe('');
    expect(toTest.helpers.maxIconOccurency('a')).toBe('');
  });

  test('Counts max icon occurency', () => {
    expect(toTest.helpers.maxIconOccurency(
      {
        '01n': 1,
        '03n': 1,
        '02n': 1,
        '01d': 1,
        '03d': 1,
        '04d': 1,
        '04n': 2
      }
    )).toBe('04n');
  });

  test('maxIconOccurency function returns expected value', () => {
    const icons = {};
    expect(toTest.helpers.maxIconOccurency(icons)).toBe('');
  });
})

describe('Check countIconsForecast function', () => {
  test('Object is empty', () => {
    expect(toTest.helpers.countIconsForecast({})).toStrictEqual({});
  });

  test('Invalid input check in countIconsForecast function', () => {
    expect(toTest.helpers.countIconsForecast(null)).toBeNull();
    expect(toTest.helpers.countIconsForecast(undefined)).toBeNull();
    expect(toTest.helpers.countIconsForecast(1)).toBeNull();
    expect(toTest.helpers.countIconsForecast('a')).toBeNull();
  });

  test('Counts countIconsForecast occurency', () => {
    expect(toTest.helpers.countIconsForecast(
      ['03n', '01n', '01n', '04d', '04d', '01d', '03n', '04n']
    )).toStrictEqual({
      '01n': 2,
      '03n': 2,
      '01d': 1,
      '04d': 2,
      '04n': 1
    });
  });
})

describe('Check getDataNextDay function', () => {
  test('Object is valid', () => {
    expect(toTest.helpers.getDataNextDay("2020-02-19")).toBe("Wed Feb 19");
  });
  test('Date format is undefined', () => {
    expect(toTest.helpers.getDataNextDay(undefined)).toBe('Invalid Date');
  });
  test('Date format is invalid', () => {
    expect(toTest.helpers.getDataNextDay("20200209")).toBe('Invalid Date');
  });
})

describe('Check updateTime function', () => {
  test('timeDate is valid', () => {
    expect(toTest.helpers.updateTime('2020-Tue Feb 18 2020 21:07:31 GMT+0100 (Central European Standard Time)-19')).toBe('2020-Tue Feb 18 2020 21:07:31');
  });
  test('Time format is invalid', () => {
    expect(toTest.helpers.updateTime(undefined)).toBe('Time format is invalid');
  });
  test('timeDate is empty object', () => {
    expect(toTest.helpers.updateTime('')).toBe('');
  });
})

describe('Check updateDate function', () => {
  test('Object is valid', () => {
    expect(toTest.helpers.updateDate('Tue Feb 18 2020 21:35:07')).toBe('Tue Feb 18');
  });
  test('Time format is invalid', () => {
    expect(toTest.helpers.updateDate(undefined)).toBe('Invalid time');
  });
  test('updateTime is empty', () => {
    expect(toTest.helpers.updateDate('')).toBe('');
  });
})

describe('Check updateHour function', () => {
  test('Object is valid', () => {
    expect(toTest.helpers.updateHour('Tue Feb 18 2020 22:00:58')).toBe('22:00:58');
  });
  test('Time format is invalid', () => {
    expect(toTest.helpers.updateHour(undefined)).toBe('Invalid time');
  });
  test('Object is empty', () => {
    expect(toTest.helpers.updateHour('')).toBe('');
  });
})

describe('Check updateHour function', () => {
  test('Object is valid', () => {
    expect(toTest.helpers.updateWeatherTime('Tue Feb 18 2020 22:00:58')).toBe('22:00:58');
  });
  test('Time format is invalid', () => {
    expect(toTest.helpers.updateWeatherTime(undefined)).toBe('Invalid time');
  });
  test('Object is empty', () => {
    expect(toTest.helpers.updateWeatherTime('')).toBe('');
  });
})