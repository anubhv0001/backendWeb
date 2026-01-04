const factorial = require('./factorial');
const numbers = [5, 7, 10, -3, 0, "abc"];
numbers.forEach(num => {
    const result = factorial(num);
    console.log(`Factorial of ${num} is: ${result}`);
});
