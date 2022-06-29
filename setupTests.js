// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';
// const { jest } = requite('@jest/globals');
// add all jest-extended matchers
const matchers = require('jest-extended');
expect.extend(matchers);

jest.useFakeTimers();
/*
expect.extend({
  toBeOneOf(received, argument) {
    const validValues = Array.isArray(argument) ? argument : [argument];
    const pass = validValues.includes(received);
    if (pass) {
      return {
        message: () => (
          `expected ${received} not to be one of [${validValues.join(', ')}]`
        ),
        pass: true,
      };
    }
    return {
      message: () => (`expected ${received} to be one of [${validValues.join(', ')}]`),
      pass: false,
    };
  },
});
*/