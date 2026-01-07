class Car {
  constructor(brand, engine, color, sunroof, automaticTransmission) {
    this.brand = brand;
    this.engine = engine;
    this.color = color;
    this.sunroof = sunroof;
    this.automaticTransmission = automaticTransmission;
  }

  getDetails() {
    return `
Car Details:
Brand: ${this.brand}
Engine: ${this.engine}
Color: ${this.color}
Sunroof: ${this.sunroof}
Automatic Transmission: ${this.automaticTransmission}
`;
  }
}
class CarBuilder {
  constructor() {
    this.brand = null;
    this.engine = null;
    this.color = null;
    this.sunroof = false;
    this.automaticTransmission = false;
  }

  setBrand(brand) {
    this.brand = brand;
    return this;
  }

  setEngine(engine) {
    this.engine = engine;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  addSunroof() {
    this.sunroof = true;
    return this;
  }

  setAutomaticTransmission() {
    this.automaticTransmission = true;
    return this;
  }

  build() {
    if (!this.brand || !this.engine || !this.color) {
      throw new Error("Brand, engine, and color must be specified");
    }

    return new Car(
      this.brand,
      this.engine,
      this.color,
      this.sunroof,
      this.automaticTransmission
    );
  }
}
function main() {
  const car = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .setAutomaticTransmission()
    .build();

  console.log(car.getDetails());
}

main();
