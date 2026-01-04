class IdleState {
  insertCoin(machine) {
    console.log("Coin inserted");
    machine.setState(machine.processingState);
  }

  selectItem() {
    console.log("Insert coin first");
  }

  dispense() {
    console.log(" Nothing to dispense");
  }
}

module.exports = IdleState;
