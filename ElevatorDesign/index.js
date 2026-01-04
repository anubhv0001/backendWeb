const ElevatorSystem = require("./system/ElevatorSystem");
const Request = require("./models/Request");

const system = new ElevatorSystem(3);

// Simulate requests
system.requestElevator(new Request(3, 8, 2));
system.requestElevator(new Request(5, 1, 1));
system.requestElevator(new Request(2, 6, 4));
