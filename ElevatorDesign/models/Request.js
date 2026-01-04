const DIRECTION = require("../constants/direction");

class Request {
  constructor(from, to, people = 1, weight = 70) {
    this.from = from;
    this.to = to;
    this.people = people;
    this.weight = weight;
    this.direction = to > from ? DIRECTION.UP : DIRECTION.DOWN;
  }
}

module.exports = Request;
