const functions = require("./functions");

test('Celsius to Farenheit convertion', () => {
  expect(functions.celsiusToFarenheit()).toBeDefined();
});
test('Celsius to Farenheit convertion', () => {
  expect(functions.celsiusToFarenheit(0)).toBe(32);
});