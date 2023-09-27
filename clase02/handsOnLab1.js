class Counter {
  static globalCount = 0;

  constructor(responsible) {
    this.responsible = responsible;
    this.count = 0;
  }
  getResponsible() {
    return this.responsible;
  }
  getIndividunalCount() {
    return this.count;
  }
  static getGlobalCount() {
    return Counter.globalCount;
  }
  increment() {
    this.count++;
    Counter.globalCount++;
  }
}

const counterOne = new Counter("Morena");
counterOne.increment();
const counterTwo = new Counter("Nacho");
counterTwo.increment();
const counterTree = new Counter("Luis");
counterTree.increment();

console.log("Morena", counterOne.getIndividunalCount());
console.log("Nacho", counterTwo.getIndividunalCount());
console.log("Luis", counterTree.getIndividunalCount());

console.log("Global", Counter.getGlobalCount());
