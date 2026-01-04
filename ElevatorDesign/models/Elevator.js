const DIRECTION = require("../constants/direction");
const STATE = require("../constants/state");

class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 1;
    this.direction = DIRECTION.IDLE;
    this.state = STATE.CLOSE_DOOR;

    this.capacityPeople = 8;
    this.capacityWeight = 680;

    this.currentPeople = 0;
    this.currentWeight = 0;
    this.requestQueue = [];
  }

  isIdle() {
    return this.direction === DIRECTION.IDLE && this.requestQueue.length === 0;
  }

  canAccept(request) {
    return (
      this.currentPeople + request.people <= this.capacityPeople &&
      this.currentWeight + request.weight <= this.capacityWeight
    );
  }

  addRequest(request) {
    this.requestQueue.push(request);
  }

  moveOneFloor() {
    if (this.direction === DIRECTION.UP) this.currentFloor++;
    else if (this.direction === DIRECTION.DOWN) this.currentFloor--;
  }

  processNext() {
    if (this.requestQueue.length === 0) {
      this.direction = DIRECTION.IDLE;
      return;
    }

    const req = this.requestQueue[0];

    if (this.currentFloor === req.from) {
      this.openDoor(req);
    } else {
      this.direction =
        this.currentFloor < req.from ? DIRECTION.UP : DIRECTION.DOWN;

      this.state = STATE.MOVING;
      this.moveOneFloor();
      this.displayStatus();
    }
  }

  openDoor(req) {
    this.state = STATE.OPEN_DOOR;
    this.direction = DIRECTION.IDLE;

    console.log(`🚪 Elevator ${this.id} OPEN at floor ${this.currentFloor}`);

    this.currentPeople += req.people;
    this.currentWeight += req.weight;

    this.closeDoor(req);
  }

  closeDoor(req) {
    this.state = STATE.CLOSE_DOOR;
    console.log(`🚪 Elevator ${this.id} CLOSED`);

    this.moveToDestination(req);
    this.requestQueue.shift();
  }

  moveToDestination(req) {
    this.direction = req.direction;

    while (this.currentFloor !== req.to) {
      this.state = STATE.MOVING;
      this.moveOneFloor();
      this.displayStatus();
    }

    console.log(`✅ Elevator ${this.id} reached floor ${req.to}`);
    this.openExit(req);
  }

  openExit(req) {
    this.state = STATE.OPEN_DOOR;
    console.log(`🚪 Elevator ${this.id} EXIT OPEN`);

    this.currentPeople -= req.people;
    this.currentWeight -= req.weight;

    this.state = STATE.CLOSE_DOOR;
  }

  displayStatus() {
    console.log(
      `🛗 Elevator ${this.id} | Floor: ${this.currentFloor} | Direction: ${this.direction} | State: ${this.state}`
    );
  }
}

module.exports = Elevator;
