const boxen= require("boxen")


const message="I am using my first external module"; 
const title="Hurray"


const classicBox=boxen(message,{
    padding:1,
    margin:1,
    title:title,
    borderStyle:"classic"
});

const singleDoubleBox = boxen(message, {
    padding: 1,
    margin: 1,
    title: title,
    borderStyle: "singleDouble"
})

const roundBox = boxen(message, {
    padding: 1,
    margin: 1,
    title: title,
    borderStyle: "round"
});

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
