class GameCharacter {
  constructor(name, level, weapon) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  clone() {
    return new GameCharacter(this.name, this.level, this.weapon);
  }
}
function main() {
  
  const warrior = new GameCharacter("Warrior", 10, "Sword");

  const warriorClone = warrior.clone();
  warriorClone.name = "Warrior Clone";

  console.log("Original Character:");
  console.log(warrior);

  console.log("\nCloned Character:");
  console.log(warriorClone);
}

main();
