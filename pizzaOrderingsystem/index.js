class Pizza {
  constructor(size, cheese, pepperoni, mushrooms) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
  }

  getDetails() {
    return `
Pizza Details:
Size: ${this.size}
Cheese: ${this.cheese}
Pepperoni: ${this.pepperoni}
Mushrooms: ${this.mushrooms}
`;
  }
}
class PizzaBuilder {
  constructor() {
    this.size = null;
    this.cheese = false;
    this.pepperoni = false;
    this.mushrooms = false;
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addMushrooms() {
    this.mushrooms = true;
    return this;
  }

  build() {
    if (!this.size) {
      throw new Error("Pizza size must be specified");
    }
    return new Pizza(
      this.size,
      this.cheese,
      this.pepperoni,
      this.mushrooms
    );
  }
}
function main() {
  const pizza = new PizzaBuilder()
    .setSize("Large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(pizza.getDetails());
}

main();
