const toTest = require("../functions.js");

test('Celsius to Farenheit convertion', () => {
  expect(toTest.helpers.celsiusToFarenheit()).toBeDefined();
});

test('Celsius to Farenheit convertion', () => {
  expect(toTest.helpers.celsiusToFarenheit(0)).toBe(32);
});
