const IdleState = require("./states/IdleState");
const ProcessingState = require("./states/ProcessingState");
const DispensingState = require("./states/DispensingState");

class VendingMachine {
  constructor() {
    this.idleState = new IdleState();
    this.processingState = new ProcessingState();
    this.dispensingState = new DispensingState();

    this.currentState = this.idleState;
  }

  setState(state) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin(this);
  }

  selectItem() {
    this.currentState.selectItem(this);
  }

  dispense() {
    this.currentState.dispense(this);
  }
}

module.exports = VendingMachine;
