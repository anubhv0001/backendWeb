class DispensingState {
  insertCoin() {
    console.log("❌ Please wait, dispensing in progress");
  }

  selectItem() {
    console.log("❌ Already dispensing");
  }

  dispense(machine) {
    console.log("🎉 Dispensing item...");
    machine.setState(machine.idleState);
  }
}

module.exports = DispensingState;
