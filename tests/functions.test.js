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
////////////////////////////////////TODO
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
    expect(toTest.helpers.countIconsForecast({})).toBe('');
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


