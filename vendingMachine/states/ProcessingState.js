class ProcessingState {
  insertCoin() {
    console.log("Coin already inserted");
  }

  selectItem(machine) {
    console.log("Item selected");
    machine.setState(machine.dispensingState);
  }

  dispense() {
    console.log("Select item first");
  }
}

module.exports = ProcessingState;
