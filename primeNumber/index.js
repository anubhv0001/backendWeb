const isPrime = require('./temp');
const numToCheck=[2,10,17,21,29];

numToCheck.forEach(num=>{
    if (isPrime(num)){
        console.log(`${num} is prime number.`)
    }
    else{
        console.log(`${num} is not a prime number.`)
    }
});