const Elevator = require("../models/Elevator");

class ElevatorSystem {
  constructor(numElevators) {
    this.elevators = [];
    this.pendingRequests = [];

    for (let i = 1; i <= numElevators; i++) {
      this.elevators.push(new Elevator(i));
    }
  }

  requestElevator(request) {
    const elevator = this.findBestElevator(request);

    if (!elevator) {
      console.log("⏳ All elevators busy. Request queued.");
      this.pendingRequests.push(request);
      return;
    }

    elevator.addRequest(request);
    elevator.processNext();
  }

  findBestElevator(request) {
    let best = null;
    let minDistance = Infinity;

    for (const elevator of this.elevators) {
      if (!elevator.canAccept(request)) continue;

      if (elevator.isIdle()) {
        const distance = Math.abs(elevator.currentFloor - request.from);
        if (distance < minDistance) {
          minDistance = distance;
          best = elevator;
        }
      }

      if (
        elevator.direction === request.direction &&
        ((request.direction === "UP" && elevator.currentFloor <= request.from) ||
          (request.direction === "DOWN" &&
            elevator.currentFloor >= request.from))
      ) {
        return elevator;
      }
    }

    return best;
  }
}

module.exports = ElevatorSystem;
